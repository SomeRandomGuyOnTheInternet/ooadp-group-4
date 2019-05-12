const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();
const sequelize = require('../config/DBConfig');
const loggedIn = require('../helpers/loggedIn');
const foodItems = require('../models/FoodItems');
const Shops = require('../models/Shops');


router.get('/', loggedIn, (req, res) => {
    Shops.findAll({ 
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
    Shops.findAll({
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
        Shops.findOne({
            where: { id }
        }), 
        foodItems.findAll({
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