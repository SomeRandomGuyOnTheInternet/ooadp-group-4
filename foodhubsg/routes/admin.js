const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();
const sequelize = require('../config/DBConfig');
const foodItems = require('../models/FoodItems');
const loggedIn = require('../helpers/loggedIn');
const Shops = require('../models/Shops');


router.get('/', loggedIn, (req, res) => {
    Shops.findAll({
        where: {
            location: req.user.location,
            rating: {
                [Op.gte]: 4.0
            },
        }
    }).then(function (shops) {
        res.render('user/index', {
            user: req.user,
            shops: shops,
        })
    })
});

router.get('/faq', loggedIn, (req, res) => {
    res.render('user/faq'), {
        user: req.user
    }

});

router.get('/shops', loggedIn, (req, res) => { 
    Shops.findAll({
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


module.exports = router; 