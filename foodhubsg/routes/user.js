const express = require('express');
const moment = require('moment'); 
const router = express.Router();

const loggedIn = require('../helpers/loggedIn');
const getMealType = require('../helpers/getMealType');
const getCurrentDate = require('../helpers/getCurrentDate');
const groupFoodItems = require('../helpers/groupFoodItems');

const Food = require('../models/FoodItem');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');


router.get('/', loggedIn, (req, res) => {
    Shop.findAll({ 
        where: { 
            location: req.user.location,
            isRecommended: true,
        }
    }).then(function (shops) {
        res.render('user/index', {
            user: req.user,
            shops: shops,
        })
    })
});

router.get('/shops', loggedIn, (req, res) => {
    Shop.findAll({
        where: {
            location: req.user.location,
        }
    }).then(function (shops) {
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
            datesWithFood: groupFoodItems(FoodItems),
            searchDate: false,
        })
    });
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
        if (!FoodItems) {
            res.locals.error = "There's no food found for that date";
            res.render('user/foodJournal', {
                user: req.user,
                datesWithFood: groupFoodItems(FoodItems),
                searchDate: searchDate,
            })
        } else {
            res.render('user/foodJournal', {
                user: req.user,
                datesWithFood: groupFoodItems(FoodItems),
                searchDate: searchDate,
            })
        }
        console.log(FoodItems)
    });
});

router.post('/addFood', loggedIn, (req, res) => {
    var user = req.user;
    var selectedFoodId = req.body.userFoodCode;

    Food.findOne({
        where: { id: req.body.userFoodCode, }
    })
    .then((foodItem) => {
        if (foodItem !== null) {
            FoodLog.create({
                UserId: user.id,
                FoodId: selectedFoodId,
                mealType: getMealType(),
                createdAtDate: getCurrentDate(),
            })
            .then(() => {
                res.redirect('/user/foodJournal');
            });    
        } else {
            var error = "This code does not exist!";
            res.locals.error = error;
            res.redirect('/user/foodJournal');
        }
    })
    .catch((err) => {
        res.locals.error = err;
        res.redirect('/logout');
        })
});

router.get('/settings', loggedIn, (req, res) => {
    res.render('user/settings', {
        user: req.user,
    })
});

router.get('/faq', loggedIn, (req, res) => {
    res.render('user/faq', {
        user: req.user,
    })
});

module.exports = router;