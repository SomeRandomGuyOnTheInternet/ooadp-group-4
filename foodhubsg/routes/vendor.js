const express = require('express');
const router = express.Router();
const loggedIn = require('../helpers/loggedIn');
const Food = require('../models/Food');
const Shops = require('../models/Shop');

router.get('/showShops', loggedIn, (req, res) => {
    res.render('vendors/vendor_index', {
        user: req.user,
    })
});

router.get('/addShops', loggedIn, (req, res)=> { 
    res.render('vendors/add_newshops', { 
        user: req.user, 
    })
})

router.get('/addMenu', loggedIn, (req, res)=> { 
    res.render('vendors/add_fooditems', {
        user: req.user, 
    })
})

module.exports = router;