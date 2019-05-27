const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();
const loggedIn = require('../helpers/loggedIn');
const Food = require('../models/Food');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');


router.get('/', loggedIn, (req, res) => {
    console.log(req.user)
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
    res.render('user/foodJournal', {
        user: req.user,
    })
});

router.post('/addFood', loggedIn, (req, res) => {
var selectedFoodId = req.body.userFoodCode;
Food.findOne({
    where: {
        id: req.body.userFoodCode,
    }
})
.then((foodItem) => {
    if (foodItem !== null) {
        FoodLog.create({
            UserId: req.user.id,
            FoodId: selectedFoodId,
        });
        res.locals.success = "You have successfully added a new food item!";
        res.render('user/foodJournal', {
            user: req.user,
        });
    } else {
        var error = "This code does not exist!";
        console.log(error);
        res.locals.error = error;
        res.render('user/foodJournal', {
            user: req.user,
        });
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