const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const isUser = require('../helpers/isUser');
const arePointsNear = require('../helpers/arePointsNear');
const getMealType = require('../helpers/getMealType');
const getCurrentDate = require('../helpers/getCurrentDate');
const getAverageCalories = require('../helpers/getAverageCalories');
const groupFoodItems = require('../helpers/groupFoodItems');

const Food = require('../models/FoodItem');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');
const User = require('../models/User');
const Question = require('../models/Question');



router.get('/', isUser, (req, res) => {
    Promise.all([
        Shop.findAll({
            where: {
                location: req.user.location,
                isRecommended: true,
                isDeleted: false,
            }
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
        shops.length = (shops.length > 0) ? 2 : 0;
        
        res.render('user/index', {
            user: req.user,
            title: "Index",
            shops,
            groupedFoodItems,
            numOfDays: Object.keys(groupedFoodItems).length,
            dailyAverageCalories: getAverageCalories(groupedFoodItems),
            breakfastAverageCalories: getAverageCalories(groupedFoodItems, "breakfastCalories"),
            lunchAverageCalories: getAverageCalories(groupedFoodItems, "lunchCalories"),
            dinnerAverageCalories: getAverageCalories(groupedFoodItems, "dinnerCalories"),
            snacksAverageCalories: getAverageCalories(groupedFoodItems, "snacksCalories"),
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
        res.render('user/shops', {
            user: req.user,
            title: "Shops",
            shops
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
            console.log(data[2])
            res.render('user/shop', {
                title: data[0].name,
                shop: data[0],
                foodItems: data[1],
                otherShops: data[2],
                vendor,
                user: req.user
            });
        })
    })
    .catch((err) => {
        req.flash('error', "That vendor does not exist!");
        res.redirect('/user/');
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
        res.render('user/foodJournal', {
            user: req.user,
            title: "Food Journal",
            groupedFoodItems: groupFoodItems(FoodItems[0], true),
            allFoodItems: FoodItems[1],
            searchDate: false,
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
        res.render('user/faq', {
            user: req.user,
	    questions: questions
        });
    });
});


router.get('/settings', isUser, (req, res) => {
    res.render('user/settings', {
        user: req.user,
        title: "Settings",
    })
});


router.post('/foodJournal', isUser, (req, res) => {
    var searchDate = req.body.searchDate;

    Food.findAll({
        include: [{
            model: FoodLog,
            where: { 
                UserId: req.user.id,
                createdAtDate: searchDate
            },
            required: true,
        },{
            model: Shop,
            required: true,
        }],
        order: [
            [FoodLog, 'createdAt', 'DESC'],
        ],
        raw: true
    })
    .then((FoodItems) => {
        res.render('user/foodJournal', {
            user: req.user,
            title: "Food Journal",
            groupedFoodItems: groupFoodItems(FoodItems, true),
            searchDate: searchDate,
        });
    });
});


router.post('/searchFood', (req, res) => {
    var foodInput = req.body.searchQuery;

    Promise.all([
        Food.findAll({
            where: { name: foodInput }
        }),
        Food.findAll({
            where: { id: foodInput }
        }), 
    ])
    .then(function (searchResults) {
        res.send(searchResults);
    })
});


router.post('/addFood', isUser, (req, res) => {
    var user = req.user, selectedFoodId = req.body.userFoodCode;

    Food.findOne({
        where: { 
            id: req.body.userFoodCode, 
            isDeleted: false 
        }
    })
    .then((foodItem) => {
        if (foodItem) {
            FoodLog.create({
                UserId: user.id,
                FoodId: selectedFoodId,
                mealType: getMealType(),
                createdAtDate: getCurrentDate(),
            })
            .then(() => {
                req.flash('success', "That food has been successfully added!");
                res.redirect('/user/foodJournal');
            });
        } else {
            req.flash('error', "This food item does not exist!");
            res.redirect('/user/foodJournal');
        }
    });
});


router.post('/editFood/:id', isUser, (req, res) => {
    const logId = req.params.id;
    const foodIdToUpdateTo = req.body.codeToChange;

    Food.findOne({ where: { id: foodIdToUpdateTo }, })
    .then((foodItem) => {
        if (foodItem) {
            FoodLog.update(
                { FoodId: foodIdToUpdateTo },
                { where: { id: logId } },
            )
            .then(() => {
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
        req.flash('success', "You've successfully deleted that food item from your log!");
        res.redirect('/user/foodJournal');
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


router.post('/searchShops', (req, res) => {
    var searchName = req.body.searchName;
    var userLocation = {lat: req.user.latitude, lng: req.user.longititude};
    var shopLocation = {lat: 0, lng: 0};

    Shop.findAll({
        where: {
            name: {
                [Sequelize.Op.like]: '%' + searchName + '%'
            },
        },
        order: [
            ['rating', 'DESC'],
        ],
    })
    .then(function (searchResults) {
        res.send(searchResults);
    })
});



module.exports = router;
