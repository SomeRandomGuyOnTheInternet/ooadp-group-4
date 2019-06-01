const express = require('express');
const router = express.Router();
const loggedIn = require('../helpers/loggedIn');
const Vendor = require('../models/Vendor');
const FoodItem = require('../models/FoodItem');
const Shop = require('../models/Shop');

router.get('/showShops', loggedIn, (req, res) => {
    const user = req.user;
    Shop.findAll({
        where: {
            VendorId: user.id,
        }
    }).then((shops) => {
         res.render('vendors/vendor_index', {
        user: req.user,
        shops: shops
    })
    })

});

router.get('/addShops', loggedIn, (req, res) => {
    res.render('vendors/add_newshops', {
        user: req.user,
    })
});

router.post('/addShops', loggedIn, (req, res) => {
    const name = req.body.name;
    const user = req.user;
    const address = req.body.address;
    const vendor = req.body.location.toString();
    const description = req.body.description;
    const rating = 4.0;
    const img = "/images/rand.jpeg";
    Shop.create({
        name: name,
        address: address,
        location: vendor,
        rating: rating,
        description: description,
        imageLocation: img,
        isDeleted: 0,
        isRecommended: 1,
        VendorId: user.id,
    })
    res.locals.success = "Shop has been successfully added!";
    res.render('vendors/vendor_index', {
        user: req.user
    })
});

router.get('/editShop/:id', loggedIn, (req, res) => {
    var id = req.params.id;
    Promise.all([
        Shop.findOne({
            where: { id }
        }),
        FoodItem.findAll({
            shopId: { id }
        })
    ])
        .then((data) => {
            res.render('vendors/editShop', {
                shop: data[0],
                foodItems: data[1],
                user: req.user,
            });
        });
})

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
