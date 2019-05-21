const express = require('express');
const router = express.Router();
const loggedIn = require('../helpers/loggedIn');
const foodItems = require('../models/FoodItems');
const Shops = require('../models/Shops');

router.get('/showShops', loggedIn, (req, res) => {
    res.render('vendors/vendor_index', {
        user: req.user,
    })
});

module.exports = router;