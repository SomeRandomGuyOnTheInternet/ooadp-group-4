const express = require('express');
const router = express.Router();
const loggedIn = require('../helpers/loggedIn');
const Shops = require('../models/Shops');
const foodItems = require('../models/FoodItems');


router.get('/vendors', loggedIn, (req, res) => {
    res.render('admin/vendors', {
        user: req.user,
    })
});

router.get('/shops', loggedIn, (req, res) => {
    Shops.findAll()
    .then(function (shops) {
        res.render('admin/shops', {
            user: req.user,
            shops: shops,
        })
    })
})

router.get('/editShop/:id', loggedIn, (req, res) => {
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
            res.render('admin/editShop', {
                shop: data[0],
                foodItems: data[1],
                user: req.user,
            });
        });
})

router.get('/addShop', loggedIn, (req, res) => {
    res.render('admin/addShop', {
        user: req.user,
    })
})

router.get('/faq', loggedIn, (req, res) => {
    res.render('admin/faq'), {
        user: req.user
    }

});

module.exports = router;
