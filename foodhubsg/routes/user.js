const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const isUser = require('../helpers/isUser');
const getUnviewedNotifications = require('../helpers/getUnviewedNotifications');
const getMealType = require('../helpers/getMealType');
const getCurrentDate = require('../helpers/getCurrentDate');
const groupFoodItems = require('../helpers/groupFoodItems');
const updateUserInfo = require('../helpers/updateUserInfo');

const Food = require('../models/FoodItem');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');
const User = require('../models/User');
const UserAction = require('../models/UserAction');
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
        })
    ])
    .then(function (data) {
        var groupedFoodItems = groupFoodItems(data[1]);
        var shops = data[0];

        getUnviewedNotifications(req.user)
        .then((unviewedNotifications) => {
            res.render('user/index', {
                user: req.user,
                title: "Index",
                shops,
                groupedFoodItems,
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
        })
        .catch((err) => {
            req.flash('error', "That shop does not exist!");
            res.redirect('/user/shops');
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
        // var availableDates = []
        // for (i = 0; i < FoodItems[0].length; i++) availableDates.push(FoodItems[0][i]['FoodLogs.createdAtDate']);
        var groupedFoodItems = groupFoodItems(FoodItems[0], true);

        getUnviewedNotifications(req.user)
        .then((unviewedNotifications) => {
            res.render('user/foodJournal', {
                user: req.user,
                title: "Food Journal",
                groupedFoodItems: groupedFoodItems[req.user.id],
                allFoodItems: FoodItems[1],
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
                questions: questions,
                unviewedNotifications
            });
        });
    });
});


router.get('/userOverview', isUser, (req, res) => {
    Promise.all([
        User.findAll({
            where: { id: { [Sequelize.Op.not]: req.user.id } },
            include: {
                model: Referral,
                required: true,
                where: { UserId: req.user.id },
            },
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
    ])
    .then((data) => {
        getUnviewedNotifications(req.user)
        .then((unviewedNotifications) => {
            res.render('user/userOverview', {
                user: req.user,
                title: req.user.name + "'s Overview",
                referredUsers: data[0],
                refUserFoodLog: groupFoodItems(data[1]),
                userFoodLog: groupFoodItems(data[2]),
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


router.post('/addBmi', isUser, (req, res) => {
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


router.post('/foodJournal', isUser, (req, res) => {
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
        ),
    })
    .then(function (searchResults) {
        res.send(searchResults);
    })
});


router.post('/addFood', isUser, (req, res) => {
    var user = req.user, selectedFoodId = req.body.userFoodCode;
    var pointsGained = 0, pointsStatement = "", pointsSource = "", hasViewed = false;

    Food.findOne({
        where: {
            id: selectedFoodId,
            isDeleted: false
        }
    })
    .then((foodItem) => {
        if (foodItem) {
            if (foodItem.isRecommended == true) {
                pointsGained = 100;

                UserAction.create({
                    UserId: user.id,
                    action: "gained 100 points",
                    source: "adding a recommended food item",
                    type: "positive",
                    additionalMessage: "Keep it up!",
                    hasViewed: false
                })
            }

            FoodLog.create({
                // UserId: user.id,
                // FoodId: selectedFoodId,
                // mealType: getMealType(),
                // createdAtDate: getCurrentDate(),
            })
            .then(() => {
                updateUserInfo(user, pointsGained);
                req.flash('success', "That food has been successfully added!");
                res.redirect('/user/foodJournal');
            });
        } else {
            req.flash('error', "That food item does not exist!");
            res.redirect('/user/foodJournal');
        }
    });
});


router.post('/editFood/:id', isUser, (req, res) => {
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
                updateUserInfo(req.user);
                req.flash('success', "You've successfully edited that food item!");
                res.redirect('/user/foodJournal');
            });
        } else {
            req.flash('error', "That code does not exist!");
            res.redirect('/user/foodJournal');
        }
    })
});


router.post('/deleteFood/:id', isUser, (req, res) => {
    var logId = req.params.id;

    FoodLog.destroy({ where: { id: logId } })
    .then(() => {
        updateUserInfo(req.user);
        req.flash('success', "You've successfully deleted that food item from your log!");
        res.redirect('/user/foodJournal');
    })
});


router.post('/addRefCode', isUser, (req, res) => {
    const refCode = req.body.selRefCode.toLowerCase();
    var error;

    Promise.all([
        User.findOne({ where: { refCode: refCode } }),
        Referral.findAll({ where: { RefUserCode: refCode, UserId: req.user.id } })
    ])
    .then((data) => {
        var referredUser = data[0];
        var existingReferral = data[1];

        if (!referredUser) error = "That referral code does not exist!";
        if (existingReferral.length > 0) error = "You've already added that code!";
        if (req.user.refCode == refCode) error = "You cannot use your own referral code!";

        if (!error) {
            Referral.create({
                UserId: req.user.id,
                RefUserCode: referredUser.refCode,
                RefUserId: referredUser.id,
            })
            .then(() => {
                req.flash('success', "You have successfully added a referral code!");
            });
        }

        res.send({ error });
    });
});


router.get('/userPage/:refCode', (req, res) => {
    Referral.findOne({
        where: {
            RefUserCode: req.params.refCode
        }
    }).then((referral) => {
        User.findOne({
            where: {
                refCode: req.params.refCode,
            }
        }).then((friend) => {
            res.render('user/friendPage', {
                user: req.user,
                friend: friend,
                compliment: referral
            })
        })
    })
})


router.post('/userPage/:refCode', (req, res) => {
    let compliment = req.body.compliment;
    Referral.update({
        compliment: compliment,
    }, {
            where: {
                RefUserCode: req.params.refCode,
                UserId: req.user.id,
            }
        }).then(() => {
            req.flash('success', 'Compliment set');
            res.redirect('/user/userOverview')
        })
})

router.get('/deleteCompliment/:id', isUser, (req, res) => {
    Referral.update({
        compliment: null,
    }, {
            where: {
                id: req.params.id, 
                UserId: req.user.id,
            }
        }).then(() => {
            req.flash('success', 'Compliment deleted');
            res.redirect('/user/userOverview')
        })
})

router.get('/editCompliment/:id', isUser, (req, res) => {
    Referral.findOne({
            where: {
                id: req.params.id, 
                UserId: req.user.id,
            }
        }).then((com) => {
            console.log(com); 
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
})


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