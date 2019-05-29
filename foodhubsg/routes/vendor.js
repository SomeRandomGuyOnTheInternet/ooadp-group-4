const express = require('express');
const router = express.Router();
const loggedIn = require('../helpers/loggedIn');
const Vendor = require('../models/Vendor');
const FoodItem = require('../models/FoodItem');
const Shop = require('../models/Shop');

router.get('/showShops', loggedIn, (req, res) => {
    res.render('vendors/vendor_index', {
        user: req.user,
    })
});

router.get('/addShops', loggedIn, (req, res) => {
    res.render('vendors/add_newshops', {
        user: req.user,
    })
});

router.post('/addShops', loggedIn, (req, res) => {
    const name = req.body.name;
    const user = req.user.id;
    const address = req.body.address;
    const vendor = req.body.vendor.value.toString();
    const description = req.body.description; 
    console.log(description); 
    const isReconmended = 1;
    const deleted = 0;
    const rating = 4.0;
    const img = "/images/rand.jpeg";
    Shop.create({ name, address, vendor, rating, description, img, deleted, isReconmended, user })
    res.locals.success = "Shop has been successfully added!"; 
    res.render('vendors/vendor_index', {
    user: req.user})
});

router.get('/addMenu', loggedIn, (req, res) => {
    res.render('vendors/add_fooditems', {
        user: req.user,
    })
})

router.post('/upload', loggedIn, (req, res) => {
    // Creates user id directory for upload if not exist
    if (!fs.existsSync('./public/uploads/' + Shop.imageLocation)) {
        fs.mkdirSync('./public/uploads/' + Shop.imageLocation);
    }

    upload(req, res, (err) => {
        if (err) {
            res.json({ file: '/img/no-image.jpg', err: err });
        } else {
            if (req.file === undefined) {
                res.json({ file: '/img/no-image.jpg', err: err });
            } else {
                res.json({ file: `/uploads/${Shop.imageLocation}/${req.file.filename}` });
            }
        }
    });
})

module.exports = router;
