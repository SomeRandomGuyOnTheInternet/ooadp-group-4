const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();
const sequelize = require('../config/DBConfig');
const loggedIn = require('../helpers/loggedIn');
const Shops = require('../models/Shops');


router.get('/', loggedIn, (req, res) => {
    console.log(req.user.location)
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

module.exports = router;