const express = require('express');
const router = express.Router();

const loggedIn = require('../helpers/loggedIn');
const getMealType = require('../helpers/getMealType');
const getCurrentDate = require('../helpers/getCurrentDate');
const getBmiStatement = require('../helpers/getBmiStatement');
const getFoodIntakeStatement = require('../helpers/getFoodIntakeStatement');
const getAverageDailyCalories = require('../helpers/getAverageDailyCalories');
const groupFoodItems = require('../helpers/groupFoodItems');

const Food = require('../models/FoodItem');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');
const User = require('../models/User');
const Question = require('../models/Question');


router.get('/', loggedIn, (req, res) => {
    Promise.all([
        Shop.findAll({
            where: {
                location: req.user.location,
                isRecommended: true,
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
        foodItems = groupFoodItems(data[1]);

        res.render('user/index', {
            user: req.user,
            shops: data[0],
            foodItems,
            numOfDays: Object.keys(foodItems).length,
        })
    })
});

router.get('/shops', loggedIn, (req, res) => {
    Shop.findAll({
        where: {
            location: req.user.location,
        }
    }).
    then(function (shops) {
        res.render('user/shops', {
            user: req.user,
            shops: shops,
        })
    })
});

router.get('/shops/:id', loggedIn, (req, res) => {
    var id = req.params.id;

    Promise.all([
        Shop.findOne({
            where: { id }
        }), 
        Food.findAll({
            shopId: { id }
        })
    ])
    .then((data) => {
        res.render('user/shop', {
            shop: data[0],
            foodItems: data[1],
            user: req.user
        });
    });
});

router.get('/foodJournal', loggedIn, (req, res) => {
    Food.findAll({
        include: [{
            model: FoodLog,
            where: { UserId: req.user.id },
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
            datesWithFood: groupFoodItems(FoodItems, true),
            searchDate: false,
        })
    });
});

router.get('/editFood/:id', loggedIn, (req, res) => {
    var logId = req.params.id;

    Food.findOne({
        include: [{
            model: FoodLog,
            where: {
                UserId: req.user.id,
                id: logId,
            },
            required: true,
        }],
        order: [
            [FoodLog, 'createdAt', 'DESC'],
        ],
        raw: true
    })
    .then((FoodItem) => {
        res.render('user/editFood', {
            user: req.user,
            FoodItem,
        })
    })
    .catch((err) => {
        req.flash('error', err);
        res.redirect('/user/editFood/' + logId);
    })
});

router.get('/settings', loggedIn, (req, res) => {
    Food.findAll({
        include: [{
            model: FoodLog,
            where: { UserId: req.user.id },
            required: true,
        }],
        order: [
            [FoodLog, 'createdAt', 'DESC'],
        ],
        raw: true
    })
    .then((FoodItems) => {
        groupedFoodItems = groupFoodItems(FoodItems);
        dailyAverageCalories = getAverageDailyCalories(groupedFoodItems);

        res.render('user/settings', {
            user: req.user,
            datesWithFood: groupedFoodItems,
            bmiStatement: getBmiStatement(req.user.weight, req.user.height, req.user.name),
        })
    });
});

router.post('/settings', loggedIn, (req, res) => {
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
	}).then(function (user) {		
		res.redirect('/user/settings'); 
        })
        .catch(err => console.log(err));
    });
    
router.get('/faq', loggedIn, (req, res) => {
    Question.findAll({
        order: [
            ['createdAt', 'ASC'],
        ],
        raw: true
    })
    .then((questions) => { 
        console.log(questions)
        res.render('user/faq', {
            user: req.user,
			questions: questions
    
    })
});
});
		
router.post('/faq', (req, res) => {
	const isAdmin = isBanned = isVendor = false;
    const isAnswered = false;
    let question = req.body.question;
	var error;

	Question.create({
		
		UserId: req.user.id,
		question: question,
			
		}).then((questions) => {
              
			req.flash('success', 'You have successfully created a question!');
            res.redirect('/user/faq');            
           //spam check
        })
    });

router.post('/foodJournal', loggedIn, (req, res) => {
    var searchDate = req.body.searchDate;

    Food.findAll({
        include: [{
            model: FoodLog,
            where: {
                UserId: req.user.id,
                createdAtDate: searchDate,
            },
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
            datesWithFood: groupFoodItems(FoodItems, true),
            searchDate: searchDate,
        })
    })
    .catch((err) => {
        req.flash('error', err);
        res.redirect('/user/foodJournal');
    })
});

router.post('/addFood', loggedIn, (req, res) => {
    var user = req.user, selectedFoodId = req.body.userFoodCode;

    Food.findOne({
        where: { id: req.body.userFoodCode, }
    })
    .then((foodItem) => {
        console.log(foodItem);
        if (foodItem) {
            FoodLog.create({
                UserId: user.id,
                FoodId: selectedFoodId,
                mealType: getMealType(),
                createdAtDate: getCurrentDate(),
            })
            .then(() => {
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

router.post('/editFood/:id', loggedIn, (req, res) => {
    var logId = req.params.id, foodIdToUpdateTo = req.body.codeToChange;

    Food.findOne({ where: { id: foodIdToUpdateTo }, })
    .then((foodItem) => {
        if (foodItem) {
            FoodLog.update(
                { FoodId: foodIdToUpdateTo },
                {
                    where: {
                        id: logId,
                    }
                },
            )
            .then(() => {
                req.flash('success', "You've successfully edited that food item!");
                res.redirect('/user/foodJournal');
            })
            .catch((err) => {
                console.log(err);
                req.flash('error', err);
                res.redirect('/user/editFood/' + logId);
            })
        } else {
            req.flash('error', "That code does not exist!");
            res.redirect('/user/editFood/' + logId);
        }
    })
    .catch((err) => {
        console.log(err)
        req.flash('error', err);
        res.redirect('/user/editFood/' + logId);
    })
});

router.post('/deleteFood/:id', loggedIn, (req, res) => {
    var logId = req.params.id;

    FoodLog.destroy({ where: { id: logId } })
    .then(() => {
        req.flash('success', "You've successfully deleted that food item from your logs!");
        res.redirect('/user/foodJournal');
    })
    .catch((err) => {
        req.flash('error', err);
        res.redirect('/user/editFood/' + logId);
    })
});

module.exports = router;