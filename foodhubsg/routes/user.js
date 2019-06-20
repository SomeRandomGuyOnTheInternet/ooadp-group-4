const express = require('express');
const router = express.Router();

const isUser = require('../helpers/isUser');
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
        groupedFoodItems = groupFoodItems(data[1]);
        shops = data[0];
        (shops.length > 0) ? 2 : 0
        
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
        })
    })
});


router.get('/shops', isUser, (req, res) => {
    Shop.findAll({
        where: {
            location: req.user.location,
            isDeleted: false,
        },
        order: [
            ['rating', 'DESC'],
        ],
    }).
    then(function (shops) {
        res.render('user/shops', {
            user: req.user,
            title: "Shops",
            shops: shops,
        })
    })
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
        })
    ])
    .then((data) => {
        User.findOne({
            where: { id: data[0].VendorId },
        })
        .then((vendor) => {
            res.render('user/shop', {
                title: data[0].name,
                shop: data[0],
                foodItems: data[1],
                vendor,
                user: req.user
            });
        })
    })
    .catch((err) => {
        console.log(err);
        req.flash('error', "That vendor does not exist!");
        res.redirect('/user/');
    });
});


router.get('/foodJournal', isUser, (req, res) => {
    Food.findAll({
        include: [{
            model: FoodLog,
            where: { UserId: req.user.id },
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
            searchDate: false,
        })
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
    
        })
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
        })
    })
    .catch((err) => {
        console.log(err)
        req.flash('error', err);
        res.redirect('/user/foodJournal');
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
            })
            .catch((err) => {
                req.flash('error', err);
                res.redirect('/user/foodJournal');
            })
        } else {
            req.flash('error', "This code does not exist!");
            res.redirect('/user/foodJournal');
        }
    })
    .catch((err) => {
        req.flash('error', err);
        res.redirect('/logout');
    })
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
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/user/foodJournal');
            })
        } else {
            req.flash('error', "That code does not exist!");
            res.redirect('/user/foodJournal');
        }
    })
    .catch((err) => {
        console.log(err)
        res.redirect('/user/foodJournal');
    })
});


router.post('/deleteFood/:id', isUser, (req, res) => {
    var logId = req.params.id;

    FoodLog.destroy({ where: { id: logId } })
    .then(() => {
        req.flash('success', "You've successfully deleted that food item from your log!");
        res.redirect('/user/foodJournal');
    })
    .catch((err) => {
        req.flash('error', err);
        res.redirect('/user/editFood/' + logId);
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
	const email = req.body.email.toLowerCase();
	const password = req.body.password;
	const isAdmin = isBanned = isVendor = false;
	const weight = req.body.weight;
	const height = req.body.height;
	
	var error;

	User.update({		
		 weight: req.body.weight,
         height: req.body.height
	},{
		where: { id: req.user.id }
    })
    .then(function (user) {		
		res.redirect('/user/settings'); 
        })
    .catch(err => console.log(err));
});



module.exports = router;