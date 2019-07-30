const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const isUser = require('../helpers/isUser');
const getUnviewedNotifications = require('../helpers/getUnviewedNotifications');
const getMealType = require('../helpers/getMealType');
const getCurrentDate = require('../helpers/getCurrentDate');
const groupFoodItems = require('../helpers/groupFoodItems');
const groupReferredUsers = require('../helpers/groupReferredUsers');
const createUserReferral = require('../helpers/createUserReferral');
const updateUserPoints = require('../helpers/updateUserPoints');
const updateUserCalories = require('../helpers/updateUserCalories');
const checkFoodItems = require('../helpers/checkFoodItems');
const checkUserActivity = require('../helpers/checkUserActivity');
const addBadges = require('../helpers/addBadges');


const Food = require('../models/FoodItem');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');
const User = require('../models/User');
const UserAction = require('../models/UserAction');
const UserBadge = require('../models/UserBadge');
const Badge = require('../models/Badge');
const Referral = require('../models/Referral');
const Question = require('../models/Question');



router.get('/', isUser, (req, res) => {
    Promise.all([
        Shop.findAll({
            where: {
                location: req.user.location,
                isDeleted: false,
            },
            order: [
                ['rating', 'DESC'],
            ],
        }),
        Food.findAll({
            include: [{
                model: FoodLog,
                where: { UserId: req.user.id },
                required: true,
            }],
            order: [
                [FoodLog, 'createdAt', 'ASC'],
            ],
            raw: true
        }),
        UserBadge.findAll({
            where: { UserId: req.user.id },
            include: {
                model: Badge,
                required: true,
            },
            raw: true
        }),
    ])
    .then(function (data) {
        var groupedFoodItems = groupFoodItems(data[1]);
        var shops = data[0];
        var userBadges = data[2];

        getUnviewedNotifications(req.user)
        .then((unviewedNotifications) => {
            res.render('user/index', {
                user: req.user,
                title: "Index",
                shops,
                groupedFoodItems,
                userBadges,
                unviewedNotifications
            });
        });
    });
});


router.get('/shops', isUser, (req, res) => {
    Shop.findAll({
        where: { isDeleted: false },
        order: [
            ['rating', 'DESC'],
        ],
    })
    .then(function (shops) {
        getUnviewedNotifications(req.user)
        .then((unviewedNotifications) => {
            res.render('user/shops', {
                user: req.user,
                title: "Shops",
                shops,
                unviewedNotifications
            });
        });
    });
});


router.get('/shops/:id', isUser, (req, res) => {
    var id = req.params.id;

    Promise.all([
        Shop.findOne({
            where: { id },
        }),
        Food.findAll({
            where: {
                ShopId: id,
                isDeleted: false,
            }
        }),
        Shop.findAll({
            where: { id: { [Sequelize.Op.not]: id } },
        }),
    ])
    .then((data) => {
        User.findOne({
            where: { id: data[0].VendorId },
        })
        .then((vendor) => {
            getUnviewedNotifications(req.user)
            .then((unviewedNotifications) => {
                res.render('user/shop', {
                    title: data[0].name,
                    shop: data[0],
                    foodItems: data[1],
                    otherShops: data[2],
                    vendor,
                    user: req.user,
                    unviewedNotifications
                });
            });
        });
    })
    .catch((err) => {
        req.flash('error', "That shop does not exist!");
        res.redirect('/user/shops');
    });
});


router.get('/foodJournal', isUser, (req, res) => {
    Promise.all([
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
        }),
        Food.findAll({
            include: [{
                model: Shop,
                required: true,
            }],
            raw: true
        }),
    ])
    .then((FoodItems) => {
        var groupedFoodItems = groupFoodItems(FoodItems[0], true);

        getUnviewedNotifications(req.user)
        .then((unviewedNotifications) => {
            res.render('user/foodJournal', {
                user: req.user,
                title: "Food Journal",
                groupedFoodItems: groupedFoodItems[req.user.id],
                allFoodItems: FoodItems[1],
                today: moment(new Date()).format("YYYY-MM-DD"),
                unviewedNotifications,
            });
        });
    });
});


router.get('/faq', isUser, (req, res) => {
    Question.findAll({
        order: [
            ['createdAt', 'ASC'],
        ],
        raw: true
    })
    .then((questions) => {
        getUnviewedNotifications(req.user)
        .then((unviewedNotifications) => {
            res.render('user/faq', {
                user: req.user,
                questions,
                unviewedNotifications
            });
        });
    });
});


router.get('/userOverview', isUser, (req, res) => {
    Promise.all([
        User.findAll({
            include: {
                model: Referral,
                required: true,
                where:
                    Sequelize.or(
                        { UserId: req.user.id },
                        { RefUserId: req.user.id },
                    ),
            },
            where: { id: { [Sequelize.Op.not]: req.user.id } },
            order: [
                ['gainedPoints', 'DESC'],
            ],
            raw: true
        }),
        UserBadge.findAll({
            include: [{
                model: Badge,
                required: true,
            }, {
                model: User,
                include: {
                    model: Referral,
                    required: true,
                    where: { UserId: req.user.id },
                },
            }],
            raw: true
        }),
        Food.findAll({
            include: [{
                model: FoodLog,
                include: {
                    model: User,
                    where: { id: { [Sequelize.Op.not]: req.user.id } },
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
            order: [
                [FoodLog, 'createdAt', 'ASC'],
            ],
            raw: true
        }),
    ])
    .then((data) => {
        getUnviewedNotifications(req.user)
        .then((unviewedNotifications) => {
            res.render('user/userOverview', {
                user: req.user,
                title: req.user.name + "'s Overview",
                referredUsers: groupReferredUsers(data[0], data[1]),
                refUserFoodLog: groupFoodItems(data[2]),
                unviewedNotifications
            });
        });
    });
});


router.get('/settings', isUser, (req, res) => {
    getUnviewedNotifications(req.user)
    .then((unviewedNotifications) => {
        res.render('user/settings', {
            user: req.user,
            title: "Settings",
            unviewedNotifications
        });
    });
});


router.post('/addBmi', (req, res) => {
    const weight = req.body.weight;
    const height = req.body.height;
    const bmi = (weight / (height * height)).toFixed(2);
    var error;

    if (height > 3 || weight < 0.5) error = 'Please enter a valid height value';
    if (weight > 200 || weight < 20) error = 'Please enter a valid weight value';

    if (!error) {
        User.update(
            { weight, height, bmi },
            { where: { id: req.user.id } },
        )
    }

    res.send({ error });
});


router.post('/foodJournal', (req, res) => {
    var searchDate = req.body.searchDate;

    Promise.all([
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
            order: [
                [FoodLog, 'createdAt', 'DESC'],
            ],
            raw: true
        }),
        Food.findAll({
            include: [{
                model: Shop,
                required: true,
            }],
            raw: true
        }),
    ])
    .then((FoodItems) => {
        var groupedFoodItems = groupFoodItems(FoodItems[0], true);

        res.render('user/foodJournal', {
            user: req.user,
            title: "Food Journal",
            groupedFoodItems: groupedFoodItems[req.user.id],
            allFoodItems: FoodItems[1],
            today: moment(new Date()).format("YYYY-MM-DD"),
            searchDate,
        });
    });
});


router.post('/searchFood', (req, res) => {
    var foodInput = req.body.searchQuery;

    Food.findOne({
        where: Sequelize.or(
            { id: foodInput },
            { name: foodInput },
        )
    })
    .then(function (searchResults) {
        res.send(searchResults);
    })
});


router.post('/addFood', (req, res) => {
    var user = req.user, selectedFoodId = req.body.foodId;

    Food.findOne({
        where: {
            id: selectedFoodId,
            isDeleted: false
        }
    })
    .then((foodItem) => {
        if (foodItem.isRecommended == true) {
            updateUserPoints(user, 100, "adding a recommended food item to your log", "Keep it up!");
            // checkFoodItems(foodItems, user)

            FoodLog.findAll({
                where: {
                    UserId: req.user.id
                },
                include: {
                    model: Food,
                    where: { isRecommended: true },
                    required: true,
                },
            })
            .then((recFoodLog) => {
                if (recFoodLog.length > 0) { addBadges('Baby Steps', user, "adding your first recommended food item"); }
                else if (recFoodLog.length > 9) { addBadges('On Your Way Up', user, "adding ten recommended food items"); }
            })
        };

        FoodLog.create({
            UserId: user.id,
            FoodId: selectedFoodId,
            mealType: getMealType(),
            createdAtDate: getCurrentDate(),
        })
        .then(() => {
            updateUserCalories(user);
            req.flash('success', "That food has been successfully added!");
        });
    });

    res.send({ user });

});


router.post('/editFood/:id', (req, res) => {
    const logId = req.params.id;
    const foodIdToUpdateTo = req.body.codeToChange;

    Food.findOne({ where: { id: foodIdToUpdateTo } })
    .then((foodItem) => {
        if (foodItem) {
            FoodLog.update(
                { FoodId: foodIdToUpdateTo },
                { where: { id: logId } },
            )
            .then(() => {
                updateUserCalories(req.user);
                req.flash('success', "You've successfully edited that food item!");
                res.redirect('/user/foodJournal');
            });
        } else {
            req.flash('error', "That code does not exist!");
            res.redirect('/user/foodJournal');
        }
    });
});


router.post('/deleteFood/:id', (req, res) => {
    const logId = req.params.id;

    FoodLog.destroy({ where: { id: logId } })
    .then(() => {
        updateUserCalories(req.user);
        req.flash('success', "You've successfully deleted that food item from your log!");
        res.redirect('/user/foodJournal');
    })
});

router.post('/acceptInvitation/:id', async (req, res) => {
    const refUserId = req.params.id;
    
    try {
        let referredUser = await User.findOne({ where: { id: refUserId } });
        let existingReferral = await Referral.findOne({ where: { UserId: req.user.id, RefUserId: refUserId } });

        if (!existingReferral) { 
            createUserReferral(req.user, referredUser);
            req.flash('success', "You have successfully added a friend!");
        } else {
            req.flash('error', "You've already added this user as a friend!");
            res.redirect('/user/');
        };
    } catch (err) {
        if (err) console.log('error', err);
    };
});


router.post('/addRefCode', async (req, res) => {
    const refCode = req.body.selRefCode.toLowerCase();
    let error;

    try {
        let referredUser = await User.findOne({ where: { refCode }});
        let existingReferral = await Referral.findOne({ where: { RefUserCode: refCode, UserId: req.user.id } });

        if (!referredUser) error = "That referral code does not exist!";
        if (existingReferral) error = "You've already used that code as a referral!";
        if (req.user.refCode == refCode) error = "You cannot use your own referral code!";

        if (!error) {
            let mutualExisitngReferral = await Referral.findOne({ where: { UserId: referredUser.id, RefUserId: req.user.id } });
            let isMutual = (mutualExisitngReferral) ? true : false;
            let additionalMessage, callToAction, callToActionLink;

            if (!isMutual) {
                additionalMessage = `An invitation to add you back as friend has been sent to ${referredUser.name}.`;
                callToAction = `Do you want to add ${req.user.name} as a friend?`;
                callToActionLink = `/user/acceptInvitation/${req.user.id}`;
            };

            createUserReferral(req.user, referredUser, isMutual, additionalMessage, callToAction, callToActionLink);
            req.flash('success', "You have successfully added a friend!"); 
        };

        res.send({ error });

    } catch (err) {
        if (err) console.log('error', err);
    }
});


router.get('/delRefCode/:id', isUser, async (req, res) => {
    var id = req.params.id;

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
        res.redirect('/user/userOverview');

    } catch (err) {
        if (err) console.log('error', err);
    };
});


router.post('/userPage', (req, res) => {
    let compliment = req.body.sendMessage;
    let id = req.body.friendId; ``
    var error;

    Referral.update(
        { compliment },
        {
            where: {
                id,
                UserId: req.user.id,
            }
        }
    )
    .then(() => {
        req.flash('success', 'Compliment set');
        res.redirect('/user/userOverview');
    });

    res.send({ error });
    
})

router.get('/deleteCompliment/:id', isUser, (req, res) => {
    Referral.findOne({
        compliment: null,
    },{
        where: {
            id: req.params.id,
            UserId: req.user.id,
        }
    })
    .then(() => {
        req.flash('success', 'Compliment deleted');
        res.redirect('/user/userOverview')
    });
}); 

router.get('/sendMessage/:id', isUser, (req, res) => {
    Referral.findOne({ where: { id: req.params.id } })
    .then(() => {
        res.render('user/sendMessages', 
        {user: req.user})
    });
}); 

router.get('/editCompliment/:id', isUser, (req, res) => {
    Referral.findOne({
        where: {
            id: req.params.id,
            UserId: req.user.id,
        }
    }).then((com) => {
        res.render('user/editCompliment', {
            compliment: com,
            user: req.user
        })
    })
})


router.post('/editCompliment/:id', isUser, (req, res) => {
    let compliment = req.body.compliment;
    Referral.update({
        compliment: compliment,
    }, {
            where: {
                id: req.params.id,
                UserId: req.user.id,
            }
        }).then(() => {
            req.flash('success', 'Compliment edited');
            res.redirect('/user/userOverview')
        })
});

router.get('/acceptRequest/:id', isUser, (req, res) => {
    Referral.update({
        isMutual: true
    }, {
            where: {
               id: req.params.id, 
            }
        }).then(() => {
            req.flash('success', 'Requested Accepted, you can now chat');
            res.redirect('/user/userOverview');
        })
});


router.post('/faq', isUser, (req, res) => {
    const isAdmin = isBanned = isVendor = false;
    const isAnswered = false;
    let question = req.body.question;
    var error;

    Question.create({
        UserId: req.user.id,
        question: question,
    })
        .then((questions) => {
            req.flash('success', 'You have successfully created a question!');
            res.redirect('/user/faq');
        })
});



router.post('/settings', isUser, (req, res) => {
    const name = req.body.name;
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
    const isAdmin = isBanned = isVendor = false;
    let weight = req.body.weight;
    let height = req.body.height;
    var error;

    bcrypt.genSalt(function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            User.update({
                weight: req.body.weight,
                height: req.body.height,
                email: email,
                password: hash,
            }, {
                    where: { id: req.user.id }
                })
                .then(function (user) {
                    res.redirect('/user/settings');
                })
                .catch(err => console.log(err));

        });
    })
});




module.exports = router;