const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const isUser = require('../helpers/isUser');
const getUnviewedNotifications = require('../helpers/getUnviewedNotifications');
const getMealType = require('../helpers/getMealType');
const getCurrentDate = require('../helpers/getCurrentDate');
const groupFoodItems = require('../helpers/groupFoodItems');
const groupMessages = require('../helpers/groupMessages');
const groupReferredUsers = require('../helpers/groupReferredUsers');
const createUserReferral = require('../helpers/createUserReferral');
const updateUserPoints = require('../helpers/updateUserPoints');
const updateUserCalories = require('../helpers/updateUserCalories');
const addBadges = require('../helpers/addBadges');
const sendEmail = require('../helpers/sendEmail');


const Food = require('../models/FoodItem');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');
const User = require('../models/User');
const UserBadge = require('../models/UserBadge');
const Badge = require('../models/Badge');
const Referral = require('../models/Referral');
const Question = require('../models/Question');
const Message = require('../models/Message');



router.get('/getNotifications', isUser, async (req, res) => {
    let unviewedNotifications;
    if (req.user.bmi) unviewedNotifications = await getUnviewedNotifications(req.user);

    res.send({ unviewedNotifications });
});


router.get('/shops', isUser, async (req, res) => {
    let unviewedNotifications = await getUnviewedNotifications(req.user);

    let shops = await
        Shop.findAll({
            where: { isDeleted: false },
            order: [['rating', 'DESC']],
        });

    res.render('user/shops', {
        user: req.user,
        title: "Shops",
        shops,
        unviewedNotifications
    });
});


router.get('/', isUser, async (req, res) => {
    let unviewedNotifications;
    if (req.user.bmi) unviewedNotifications = await getUnviewedNotifications(req.user);

    let shops = await
        Shop.findAll({
            where: {
                location: req.user.location,
                isDeleted: false,
            },
            order: [['rating', 'DESC']],
        });

    let foodItems = await
        Food.findAll({
            include: [{
                model: FoodLog,
                where: { UserId: req.user.id },
                required: true,
            }],
            order: [[FoodLog, 'createdAt', 'ASC']],
            raw: true
        });

    let userBadges = await
        UserBadge.findAll({
            where: { UserId: req.user.id },
            include: {
                model: Badge,
                required: true,
            },
            order: [[Badge, 'id', 'ASC']],
            raw: true
        });

    res.render('user/index', {
        user: req.user,
        title: "Index",
        shops,
        groupedFoodItems: groupFoodItems(foodItems),
        userBadges,
        unviewedNotifications
    });
});


router.get('/shops', isUser, async (req, res) => {
    let unviewedNotifications = await getUnviewedNotifications(req.user);

    let shops = await
        Shop.findAll({
            where: { isDeleted: false },
            order: [['rating', 'DESC']],
        });

    res.render('user/shops', {
        user: req.user,
        title: "Shops",
        shops,
        unviewedNotifications
    });
});


router.get('/shops/:id', isUser, async (req, res) => {
    let id = req.params.id;
    let unviewedNotifications = await getUnviewedNotifications(req.user);

    try {
        let shop = await Shop.findOne({ where: { id } });
        let vendor = await User.findOne({ where: { id: shop.VendorId } });
        let otherShops = await Shop.findAll({ where: { id: { [Sequelize.Op.not]: id } } });
        let foodItems = await
            Food.findAll({
                where: {
                    ShopId: id,
                    isDeleted: false,
                }
            });

        res.render('user/shop', {
            title: shop.name,
            shop,
            foodItems,
            otherShops,
            vendor,
            user: req.user,
            unviewedNotifications
        });
    } catch (err) {
        req.flash('error', "That shop does not exist!");
        res.redirect('/user/shops');
    };
});


router.get('/foodJournal', isUser, async (req, res) => {
    let unviewedNotifications = await getUnviewedNotifications(req.user);

    let foodItems = await
        Food.findAll({
            include: [{
                model: FoodLog,
                where: { UserId: req.user.id },
                required: true,
            }, {
                model: Shop,
                required: true,
            }],
            order: [
                [FoodLog, 'createdAt', 'DESC'],
            ],
            raw: true
        });

    let allFoodItems = await
        Food.findAll({
            include: [{
                model: Shop,
                required: true,
            }],
            raw: true
        });

    let groupedFoodItems = groupFoodItems(foodItems, true);

    res.render('user/foodJournal', {
        user: req.user,
        title: "Food Journal",
        groupedFoodItems: groupedFoodItems[req.user.id],
        allFoodItems,
        today: moment(new Date()).format("YYYY-MM-DD"),
        unviewedNotifications,
    });
});


router.get('/friendActivity', isUser, async (req, res) => {
    let unviewedNotifications = await getUnviewedNotifications(req.user);

    let referredUsers = await
        User.findAll({
            include: {
                model: Referral,
                required: true,
                where: { UserId: req.user.id },
            },
            order: [['gainedPoints', 'DESC']],
            raw: true
        });

    let refUserBadges = await
        UserBadge.findAll({
            include: [{
                model: Badge,
                required: true,
            },{
                model: User,
                include: {
                    model: Referral,
                    required: true,
                    where: { UserId: req.user.id },
                },
            }],
            order: [[Badge, 'id', 'ASC']],
            raw: true
        });

    let refUserFoodLog = await
        Food.findAll({
            include: [{
                model: FoodLog,
                include: {
                    model: User,
                    include: {
                        model: Referral,
                        where: { UserId: req.user.id },
                    },
                    attributes: ['id'],
                    required: true,
                },
                required: true,
                raw: true
            }],
            raw: true
        });

    res.render('user/friendActivity', {
        user: req.user,
        title: "Friend Activity",
        referredUsers: groupReferredUsers(referredUsers, refUserBadges),
        refUserFoodLog: groupFoodItems(refUserFoodLog),
        unviewedNotifications
    });
});


router.get('/sendMessage/:id', isUser, async (req, res) => {
    try {
        let chat = await Referral.findOne({ where: { id: req.params.id } });
        let friend = await User.findOne({ where: { id: chat.RefUserId } });

        let history = await
            Message.findAll({
                where:
                    Sequelize.and(
                        Sequelize.or({ User1Id: req.user.id },
                            { User2Id: req.user.id }),
                        Sequelize.or(
                            { User1Id: friend.id },
                            { User2Id: friend.id })
                    ),
                include: {
                    model: User,
                    where: Sequelize.or({ id: req.user.id }, { id: friend.id }),
                    required: true
                },
                order: [['createdAt', 'ASC']],
                raw: true
            });

        res.render('user/sendMessages',{ 
            user: req.user,
            title: "Chat History",
            chat, 
            friend, 
            groupedMessages: groupMessages(history) 
        });
    } 
    
    catch (error) {
        console.log(error);
        req.flash('error', "Please use a valid URL!");
        res.redirect('/user/friendActivity');
    }
});


router.get('/settings', isUser, async (req, res) => {
    let unviewedNotifications = await getUnviewedNotifications(req.user);

    res.render('user/settings', {
        user: req.user,
        title: "Settings",
        unviewedNotifications
    });
});



router.post('/addBmi', async (req, res) => {
    const weight = req.body.weight;
    const height = req.body.height;
    const bmi = (weight / (height * height)).toFixed(2);
    let error;

    if (height > 3 || weight < 0.5) error = 'Please enter a valid height value';
    if (weight > 200 || weight < 20) error = 'Please enter a valid weight value';

    if (!error) {
        await
            User.update(
                { weight, height, bmi },
                { where: { id: req.user.id } },
            );
                
        if (bmi < 23) addBadges('Keeping Fit', req.user, "being within the recommended BMI range");

        req.flash('success', "You've successfully updated your weight and height!");
    };

    res.send({ error });
});


router.post('/foodJournal', async (req, res) => {
    let searchDate = req.body.searchDate;

    let unviewedNotifications = await getUnviewedNotifications(req.user);

    let foodItems = await
        Food.findAll({
            include: [{
                model: FoodLog,
                where: {
                    UserId: req.user.id,
                    createdAtDate: searchDate
                },
                required: true,
            }, {
                model: Shop,
                required: true,
            }],
            order: [[FoodLog, 'createdAt', 'DESC']],
            raw: true
        });

    let allFoodItems = await
        Food.findAll({
            include: [{
                model: Shop,
                required: true,
            }],
            raw: true
        });

    let groupedFoodItems = groupFoodItems(foodItems, true);

    res.render('user/foodJournal', {
        user: req.user,
        title: "Food Journal",
        groupedFoodItems: groupedFoodItems[req.user.id],
        allFoodItems,
        today: moment(new Date()).format("YYYY-MM-DD"),
        searchDate,
        unviewedNotifications,
    });
});


router.post('/searchFood', async (req, res) => {
    let foodInput = req.body.searchQuery;

    let searchResults = await
        Food.findOne({
            where: Sequelize.or(
                { id: foodInput },
                { name: foodInput },
            )
        });

    res.send(searchResults);
});


router.post('/addFood', async (req, res) => {
    let user = req.user, selectedFoodId = req.body.foodId;

    let foodItem = await
        Food.findOne({
            where: {
                id: selectedFoodId,
                isDeleted: false
            }
        });

    await
        FoodLog.create({
            UserId: user.id,
            FoodId: selectedFoodId,
            mealType: getMealType(),
            createdAtDate: getCurrentDate(),
        });

    if (foodItem.isRecommended) {
        updateUserPoints(user, 100, "adding a food item below 500 calories to your log", "Keep it up!");

        let recFoodLog = await
            FoodLog.findAll({
                where: {
                    UserId: req.user.id
                },
                include: {
                    model: Food,
                    where: { isRecommended: true },
                    required: true,
                }
            });

        if (recFoodLog.length > 0) { addBadges('Baby Steps', user, "adding your first recommended food item"); }
        else if (recFoodLog.length > 9) { addBadges('Picking Up Steam', user, "adding ten recommended food items"); }
    };

    updateUserCalories(user);

    req.flash('success', "That food has been successfully added!");
    res.send({ user });

});


router.post('/editFood/:id', async (req, res) => {
    const logId = req.params.id;
    const foodId = req.body.codeToChange;
    const foodItem = await Food.findOne({ where: { id: foodId } });

    if (foodItem) {
        await
            FoodLog.update(
                { FoodId: foodId },
                { where: { id: logId } },
            );

        updateUserCalories(req.user);

        req.flash('success', "You've successfully edited that food item!");
        res.redirect('/user/foodJournal');
    } else {
        req.flash('error', "That code does not exist!");
        res.redirect('/user/foodJournal');
    }
});


router.post('/deleteFood/:id', async (req, res) => {
    const logId = req.params.id;
    const foodItemToDelete = await 
        FoodLog.findOne({ 
            where: { id: logId },
            include: {
                model: Food,
                required: true,
            },
            raw: true
        });

    await FoodLog.destroy({ where: { id: logId } });
    updateUserCalories(req.user);

    if (foodItemToDelete["FoodItem.isRecommended"]) {
        updateUserPoints(req.user, -100, "removing a recommended food item from your log");
    };

    req.flash('success', "You've successfully deleted that food item from your log!");
    res.redirect('/user/foodJournal');
});


router.post('/acceptInvitation/:id', async (req, res) => {
    const refUserId = req.params.id;

    let referredUser = await User.findOne({ where: { id: refUserId } });
    let existingReferral = await Referral.findOne({ where: { UserId: req.user.id, RefUserId: refUserId } });

    if (!existingReferral) {
        createUserReferral(req.user, referredUser, true, `You're now mutual friends with ${referredUser.name}.`);

        req.flash('success', "You have successfully added a mutual friend!");
        res.redirect('/user/friendActivity');
    } else {
        req.flash('error', "You've already added this user as a friend!");
        res.redirect('/user');
    };
});


router.post('/inviteFriend', async (req, res) => {
    const friendEmail = req.body.friendEmail.toLowerCase();
    let error, success;
    let existingUser = await User.findOne({ where: { email: friendEmail } });

    if (existingUser) error = "That user already exists!";

    if (!error) {
        try {
            await sendEmail(req.user, friendEmail);
            success = "An email with an invitation has been sent to your friend!";
        } catch (err) {
            error = "Please enter a valid email address!"
        };
    }

    res.send({ error, success });
});


router.post('/addRefCode', async (req, res) => {
    const refCode = req.body.selRefCode.toLowerCase();
    let error;

    let referredUser = await User.findOne({ where: { refCode } });
    let existingReferral = await Referral.findOne({ where: { RefUserCode: refCode, UserId: req.user.id } });

    if (!referredUser) error = "That referral code does not exist!";
    if (existingReferral) error = "You've already used that code as a referral!";
    if (req.user.refCode == refCode) error = "You cannot use your own referral code!";

    if (!error) {
        let mutualExisitngReferral = await Referral.findOne({ where: { UserId: referredUser.id, RefUserId: req.user.id } });
        let isMutual = (mutualExisitngReferral) ? true : false;
        let additionalMessage, callToAction, callToActionLink;

        if (!isMutual) {
            additionalMessage = `An invitation to add you back as a friend has been sent to ${referredUser.name}.`;
            callToAction = `Do you want to add ${req.user.name} as a friend?`;
            callToActionLink = `/user/acceptInvitation/${req.user.id}`;
        }
        else {
            additionalMessage = `You're now mutual friends with ${referredUser.name}.`;
        }

        createUserReferral(req.user, referredUser, isMutual, additionalMessage, callToAction, callToActionLink);
        req.flash('success', "You have successfully added a friend!");
    };

    res.send({ error });
});


router.get('/delRefCode/:id', isUser, async (req, res) => {
    let id = req.params.id;

    try {
        let existingReferral = await Referral.findOne({ where: { id } });

        await Referral.destroy({ where: { id } });
        await
            Referral.update(
                { isMutual: false },
                { where: { UserId: existingReferral.RefUserId, RefUserId: req.user.id } }
            );

        updateUserPoints(req.user, -75, "removing someone from your friend group");

        req.flash('success', "You have successfully deleted a referral code!");
        res.redirect('/user/friendActivity');

    } catch (err) {
        if (err) console.log('error', err);
    };
});


router.post('/checkMessages/:id', isUser, async (req, res) => {
    try {
        let groupedMessages = {};
        let chat = await Referral.findOne({ where: { id: req.params.id } });
        let friend = await User.findOne({ where: { id: chat.RefUserId } });
        let history = await
            Message.findAll({
                where:
                    Sequelize.and(
                        Sequelize.or({ User1Id: req.user.id },
                            { User2Id: req.user.id }),
                        Sequelize.or(
                            { User1Id: friend.id },
                            { User2Id: friend.id })
                    ),
                include: {
                    model: User,
                    where: Sequelize.or({ id: req.user.id }, { id: friend.id }),
                    required: true
                },
                order: [['createdAt', 'ASC']],
                raw: true
            });

        groupedMessages = groupMessages(history);
        res.send({ groupedMessages });
    } catch (error) {
        req.flash('error', "Please use a valid URL!");
        res.redirect('/user/friendActivity');
    }
});


router.post('/sendMessage/:id', isUser, async (req, res) => {
    let chat = req.body.message;
    let senderid = req.user.id;
    let receiverid = req.body.receive;
    
    await
        Message.create({
            Message: chat,
            User1Id: senderid,
            User2Id: receiverid
        });

    req.flash('success', 'Message Sent');
    res.redirect(`/user/sendMessage/${req.params.id}`);
});


router.get('/deleteMessage/:id', isUser, async (req, res) => {
   let delMsg = await Message.findOne({ 
       where: { 
           id : req.params.id
       }
   })
   console.log(delMsg.User2Id); 
    await Message.destroy({
            where: {
                id: req.params.id
            }
        }); 
    
    let referral = await Referral.findOne({ 
        where: { 
            UserId: req.user.id, 
            RefUserId: delMsg.User2Id
        }
    })
    req.flash('success', 'Message Deleted');
    res.redirect(`/user/sendMessage/${referral.id}`);
});


router.get('/faq', isUser, async (req, res) => {
    let unviewedNotifications = await getUnviewedNotifications(req.user);

    let questions = await
        Question.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
            raw: true
        });

        res.render('user/faq', {
            user: req.user,
            title: "FAQ",
            questions,
            unviewedNotifications
    });
});


router.post('/faq', isUser, async (req, res) => {
    const isAdmin = isBanned = isVendor = false;
    const isAnswered = false;
    let title = req.body.title;
    let description = req.body.description;
    let suggestion = req.body.suggestion;
    var error;

    Question.create({
        UserId: req.user.id,
        title,
        description,
        suggestion
    }).then((question) => {

        req.flash('success', 'You have successfully created a question!');
        res.redirect('/user/faq');
    });
});

// Shows edit questions page
router.get('/editQuestion', isUser, async (req, res) => {
    let unviewedNotifications = await getUnviewedNotifications(req.user);
    let question = await

    Question.findOne({
		where: {
			UserId: req.user.id
		},
	}).then((question) => {
	    res.render('user/editQuestion',{
            question  
        
    });
});
});


// save edited video
router.post('/editQuestion',  isUser, async (req, res) => {
    const isAdmin = isBanned = isVendor = false;
    const isAnswered = false;
    let title = req.body.title;
    let description = req.body.description;
    let suggestion = req.body.suggestion;
    let questionId = req.params.id;
    var error;
	
	Question.update({
		title,
        description,
        suggestion
	}, {
		where: {
			UserId: req.user.id
		}
	}).then(() => {
        req.flash('success', 'You have suggested an answer!');
	res.redirect('/user/faq'); 
    }).catch(err => console.log(err));
});


router.post('/suggestion', isUser, async (req, res) => {
    const isAdmin = isBanned = isVendor = false;
    const isAnswered = false;
    let suggestion = req.body.suggestion;
    var error;

    Question.create({
        UserId: req.user.id,
        suggestion
    }) .then((question) => {

            req.flash('success', 'You have suggested an answer!');
            res.redirect('/user/faq');
        });
});


router.get('/settings', isUser, async (req, res) => {
    let unviewedNotifications = await getUnviewedNotifications(req.user);

    res.render('user/settings', {
        user: req.user,
        title: "Settings",
        unviewedNotifications
    });
});


router.post('/settings', isUser, async (req, res) => {
    const name = req.body.name;
    const weight = req.body.weight;
    const height = req.body.height;
    const bmi = (weight / (height * height)).toFixed(2);
    let error;

    if (height > 3 || weight < 0.5) error = 'Please enter a valid height value';
    if (weight > 200 || weight < 20) error = 'Please enter a valid weight value';

    if (!error) {
        await
            User.update(
                { name, weight, height, bmi},
                { where: { id: req.user.id } },
            );

        if (req.user.bmi < 23) addBadges('Picking Up Steam', req.user, "being within the recommended BMI range");

        req.flash('success', 'You\'ve successfully updated your settings!');
    };
    
    res.redirect('/user/settings');
});

router.post('/deleteQuestion/:id', isUser, (req, res) => {
    let questionId = req.params.id;
    let error;

    Question.destroy({
        where: {
            id: questionId,
        },
    })
        .then(() => {

            req.flash('success', "You've successfully deleted the question!");
            res.redirect('/user/faq');
        })
});



module.exports = router;