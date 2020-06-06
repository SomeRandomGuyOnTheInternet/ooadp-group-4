const _ = require('lodash');
const moment = require('moment');
const multer = require('multer');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const Sequelize = require('sequelize');

const Shop = require('./models/Shop');
const FoodItem = require('./models/FoodItem');
const User = require('./models/User');
const UserAction = require('./models/UserAction');
const FoodLog = require('./models/FoodLog');
const Food = require('./models/FoodItem');
const Notification = require('./models/Notification');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/' + req.user.id + '/');
    },
    filename: (req, file, callback) => {
        callback(null, req.user.id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000000,
    },
    fileFilter: (req, file, callback) => {
        checkFileType(file, callback);
    }
}).single('venImage');


module.exports = {
    isLoggedOut: (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    },
    
    isUser: (req, res, next) => {
        if (req.user) {
            if (req.user.isVendor || req.user.isAdmin) {
                req.flash('error', "You do not have sufficient permissions to enter that page!");
                res.redirect('/');
            } else {
                if (!req.user.bmi && req.path != '/') {
                    res.redirect('/user');
                } else {
                    next();
                }
            }
        } else {
            res.redirect('/login');
        }
    },

    isAdmin: (req, res, next) => {
        if (req.user) {
            if (req.user.isAdmin) {
                next();
            } else {
                req.flash('error', "You do not have sufficient permissions to enter that page!");
                res.redirect('/');
            }
        } else {
            res.redirect('/login');
        }
    },

    isVendor: (req, res, next) => {
        if (req.user) { 
            if (req.user.isVendor) {
                next();
            } else {
                req.flash('error', "You do not have sufficient permissions to enter that page!");
                res.redirect('/');
            }
        } else {
            res.redirect('/login');
        }
    },

    addBadges: async (name, user, source) => {
        let badge = await Badge.findOne({ where: { name } });
        let existingBadge = await
            UserBadge.findAll({
                where: {
                    UserId: user.id,
                    BadgeId: badge.id
                }
            });
    
        if (!existingBadge.length) {
            await
                UserBadge.create({
                    UserId: user.id,
                    BadgeId: badge.id
                });
    
            await
                UserAction.create({
                    UserId: user.id,
                    action: `earned the ${badge.name} badge`,
                    source,
                    type: "positive",
                    additionalMessage: "You can view this badge on your page.",
                    hasViewed: false
                });
        };
    },

    arePointsNear: (checkPoint, centerPoint, km) => {
        let ky = 40000 / 360;
        let kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
        let dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
        let dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;
    },

    checkFoodItems: (foodItems, user) => { 
        let count = foodItems.length; 
    
        if (count > 0) { 
            addBadges('Baby Steps', user, "First step to health"); 
        }
        
        else if (count > 10) { 
            addBadges('On Your Way Up', user, "You have gone a long way"); 
        }
    },

    checkFriends: (referrals, user) => { 
        let count = referrals.length; 
    
        if (count > 0) { 
            addBadges('First Friend', user, "Keeping you on track"); 
        }
        else if (count > 10) { 
            addBadges('Full House', user, "It's so much easier with good friends"); 
        }
    },

    checkUserActivity: (user) => { 
        if (user.daysActive == 7 && user.averageCalories <= 2500) { 
            addBadges('A Week of Health', user, "Been with us for 7 days"); 
        }
    },

    createUserReferral: async (user, referredUser, isMutual = true, additionalMessage = null, callToAction = null, callToActionLink = null) => {
        let refUserAdditionalMessage = (isMutual) ? `You've now become mutual friends with ${user.name}.` : null;
    
        await
            Referral.create({
                UserId: user.id,
                RefUserCode: referredUser.refCode,
                RefUserId: referredUser.id,
                isMutual,
            });
    
        await
            Referral.update(
                { isMutual },
                { where: { UserId: referredUser.id, RefUserId: user.id } }
            );
    
        updateUserPoints(user, 75, "adding a friend to your profile", additionalMessage);
        updateUserPoints(referredUser, 25, `${user.name} adding you to their friend group`, refUserAdditionalMessage, callToAction, callToActionLink);
    
        let userReferrals = await Referral.findAll({ where: { UserId: user.id } });
    
        if (userReferrals.length >= 1) { addBadges('First Friend', user, "adding your first referral"); }
        else if (userReferrals.length >= 10) { addBadges('Full House', user, "adding ten referrals"); }
    },

    generateCode: (length = 6) => {
        let result = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    getAverageCalories: (datesWithFood, mealType = "dailyCalories") => {
        let averageCalories = 0, totalCalorieIntake = 0, numOfDays = 0;
        numOfDays = Object.keys(datesWithFood).length;
    
        if (numOfDays > 0) {
            for (let [key] of Object.entries(datesWithFood)) {
                totalCalorieIntake += parseInt(datesWithFood[key][mealType]);
            }
            averageCalories = totalCalorieIntake / numOfDays;
        }
    
        return Number(averageCalories).toFixed(2);
    },

    getCurrentDate: () => {
        today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
    
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
    
        return (mm + "-" + dd + "-" + yyyy);
    },

    getMealType: () => {
        let today = new Date();
    
        if (today.getHours() >= 6 && today.getHours() <= 9) {
            mealType = "Breakfast";
        } else if (today.getHours() >= 12 && today.getHours() <= 14) {
            mealType = "Lunch";
        } else if (today.getHours() >= 18 && today.getHours() <= 21) {
            mealType = "Dinner";
        } else {
            mealType = "Snacks";
        };
    
        return mealType;
    },

    getShopRating: (foodItems) => {
        let rating = 0, averageCalories = 0;
    
        for (i = 0, totalCalories = 0; i < foodItems.length; i++) {
            totalCalories += Number(foodItems[i].calories);
        }
    
        averageCalories = (totalCalories / foodItems.length);
        if (averageCalories > 800) { rating = 1 } 
        else if (700 < averageCalories && averageCalories < 799) { rating = 2 } 
        else if (600 < averageCalories && averageCalories < 699) { rating = 3 } 
        else if (500 < averageCalories && averageCalories < 599) { rating = 4 } 
        else { rating = 5 }
    
        return rating;
    },

    getUnviewedNotification: (user) => {
        return new Promise(async (resolve, reject) => {
            try {
                let unviewedNotifications = await Notification.findAll({ where: { hasViewed: false, UserId: user.id } });
    
                await
                    Notification.update(
                        { hasViewed: true },
                        { where: { hasViewed: false, UserId: user.id } },
                        { raw: true }
                    );
    
                resolve(unviewedNotifications);
            } catch (error) {
                reject(error);
            }
        });
    },

    groupFoodItems: (ungroupedFoodItems, setDates = false) => {
        let datesWithFood;
        let userFoodLog = _.groupBy(ungroupedFoodItems, 'FoodLogs.UserId');
    
        for (let [userId, foodLog] of Object.entries(userFoodLog)) {
            datesWithFood = _.groupBy(foodLog, 'FoodLogs.createdAtDate');
    
            for (let [date, dateFood] of Object.entries(datesWithFood)) {
                for (i = 0, breakfastCalories = 0, lunchCalories = 0, dinnerCalories = 0, snacksCalories = 0, dailyCalories = 0; i < dateFood.length; i++) {
                    switch (dateFood[i]["FoodLogs.mealType"]) {
                        case "Breakfast":
                            breakfastCalories += parseInt(dateFood[i].calories);
                            break;
    
                        case "Lunch":
                            lunchCalories += parseInt(dateFood[i].calories);
                            break;
    
                        case "Dinner":
                            dinnerCalories += parseInt(dateFood[i].calories);
                            break;
    
                        case "Snacks":
                            snacksCalories += parseInt(dateFood[i].calories);
                            break;
                    }
                    dailyCalories += parseInt(dateFood[i].calories);
                    if (setDates == true) { dateFood[i]["FoodLogs.createdAt"] = moment(dateFood[i]["FoodLogs.createdAt"]).format("h:mm a"); }
                }
                datesWithFood[date] = _.groupBy(dateFood, 'FoodLogs.mealType');
                datesWithFood[date].breakfastCalories = breakfastCalories;
                datesWithFood[date].lunchCalories = lunchCalories;
                datesWithFood[date].dinnerCalories = dinnerCalories;
                datesWithFood[date].snacksCalories = snacksCalories;
                datesWithFood[date].dailyCalories = dailyCalories;
            }
            userFoodLog[userId] = datesWithFood;
        }
    
        return userFoodLog;
    },

    groupMessages: (messageHistory) => {
        return _.groupBy(messageHistory, messageDate => { return moment.utc(messageDate.createdAt).local().format("DD-MM-YYYY"); });
    },

    groupReferredUsers: (referredUsers, badges) => {
        for (i = 0; i < referredUsers.length; i++) {
            referredUsers[i].badges = [];
            referredUsers[i].isMutual = referredUsers[i]['Referrals.isMutual'];
    
            for (j = 0; j < badges.length; j++) {
                if (referredUsers[i].id == badges[j].UserId) referredUsers[i]["badges"].push(badges[j]);
            }
        };
    
        return referredUsers;
    },

    groupVendors: (vendors) => {
        groupedVendors = _.groupBy(vendors, 'name');
        return groupedVendors;
    },

    imageUpload: (file, callback) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return callback(null, true);
        } else {
            callback({ message: 'Images Only' });
        }
    },

    sendEmail: (sender, email) => {
        sgMail.setApiKey("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");
    
        const message = {
            to: email,
            from: 'FoodHub.SG <admin@foodhubsg.com>',
            subject: `Invitation From ${sender.name}`,
            text: ' ',
            html: `<div style="text-align: center !important"><img src="https://i.imgur.com/qeSfYXs.png" width="65px" height="60px" alt="FoodHub.SG Logo"><br>
                    <span style="color: #707070; font-weight: bold; font-size: 20px;">FoodHub.SG</span></div><br><br><br>
                    ${sender.name} has invited you to FoodHub.SG, where you can log your calorie intake and compare your intake with other people. 
                    Click here to <a href="http://127.0.0.1:5000"> <strong>register</strong></a> with us and use the referral code <strong>${sender.refCode}</strong> to 
                    start your journey!`
        };
    
        return new Promise((resolve, reject) => {
            sgMail.send(message)
            .then(msg => resolve(msg))
            .catch(err => reject(err));
        });
    },

    toTitleCase: (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    updateShopRating: async (ShopId) => {
        let rating = null, isRecommended = null;
        let isDeleted = false;
    
        let foodItems = await FoodItem.findAll({ where: { ShopId, isDeleted } });
    
        if (foodItems.length) {
            rating = getShopRatings(foodItems);
            isRecommended = (rating >= 3) ? true : false;
        };
    
        await
            Shop.update(
                {
                    rating,
                    isRecommended,
                },
                { where: { id: ShopId } }
            );
    },

    updateUserCalories: async (user) => {
        let foodItems = await 
            Food.findAll({
                include: [{
                    model: FoodLog,
                    where: { UserId: user.id },
                    required: true,
                }],
                raw: true
            });
    
        let groupedFoodItems = groupFoodItems(foodItems);
    
        await
            User.update(
                {
                    averageCalories: getAverageCalories(groupedFoodItems[user.id]),
                    averageBreakfastCalories: getAverageCalories(groupedFoodItems[user.id], "breakfastCalories"),
                    averageLunchCalories: getAverageCalories(groupedFoodItems[user.id], "lunchCalories"),
                    averageDinnerCalories: getAverageCalories(groupedFoodItems[user.id], "dinnerCalories"),
                    averageSnacksCalories: getAverageCalories(groupedFoodItems[user.id], "snacksCalories"),
                    daysActive: Object.keys(groupedFoodItems[user.id]).length,
                },
                { where: { id: user.id } }
            );
    },

    updateUserPoints: async (user, points, source, additionalMessage = null, callToAction = null, callToActionLink = null) => {
        var startDt = new Date();
        var endDt = new Date(startDt);
        endDt.setMinutes(startDt.getMinutes() - 5);
    
        if (!user.isBanned) {
            let type = (points > 0) ? "positive" : "negative";
            let pointsAction = (points > 0) ? "gained" : "lost";
    
            await
                User.update(
                    { gainedPoints: Sequelize.literal(`gainedPoints + ${points}`) },
                    { where: { id: user.id } }
                );
            
            await
                UserAction.create({
                    UserId: user.id,
                    action: `${pointsAction} ${Math.abs(points)} points`,
                    source,
                    type,
                    additionalMessage,
                    hasViewed: false,
                    callToAction,
                    callToActionLink,
                });
    
            let updatedUser = await User.findOne({ where: { id: user.id } });  
            let recentPointAdditions = await
                UserAction.findAll({
                    where: {
                        action: { [Sequelize.Op.like]: '%' + "points" + '%' },
                        UserId: user.id,
                        createdAt: { [Sequelize.Op.between]: [endDt, startDt] }
                    },
                    raw: true
                });
    
            if (recentPointAdditions.length > 5) {
                await
                    UserAction.create({
                        UserId: user.id,
                        action: "been detected cheating the points system",
                        source: "getting too many points in a short timespan",
                        type: "negative",
                        additionalMessage: "You will be banned from earning points if you continue cheating.",
                        hasViewed: false
                    });
            };
    
            if (recentPointAdditions.length >= 10) {
                await
                    User.update(
                        { isBanned: true },
                        { where: { id: user.id } }
                    );
                
                await
                    UserAction.create({
                        UserId: user.id,
                        action: "been banned from earning points",
                        source: "getting too many points in a short timespan",
                        type: "negative",
                        additionalMessage: "If you have any enquiries, please contact us at admin@foodhubsg.com.",
                        hasViewed: false
                    });
            };
    
            if (updatedUser.gainedPoints >= 1000) {
                addBadges('High Roller', user, "obtaining more than 1000 points");
            };
    
            if (updatedUser.gainedPoints >= 10000) {
                addBadges('Baller', user, "obtaining more than 10000 points");
            };
        };
    }
}