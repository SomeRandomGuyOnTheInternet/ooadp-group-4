const express = require('express');
const fs = require('fs');
const router = express.Router();

const loggedIn = require('../helpers/loggedIn');
const upload = require('../helpers/imageUpload');

const Vendor = require('../models/Vendor');
const FoodItem = require('../models/FoodItem');
const Shop = require('../models/Shop');

router.get('/showShops', loggedIn, (req, res) => {
    const user = req.user;
    Shop.findAll({
        where: {
            VendorId: user.id,
            isDeleted: false,
        }
    }).then((shops) => {
        res.render('vendors/vendor_index', {
            user: req.user,
            shops: shops
        })
    })

});

router.get('/addShops', loggedIn, (req, res) => {
    res.render('vendors/addShop', {
        user: req.user,
    })
});

router.get('/exampleMap', loggedIn, (req, res) => {
    res.render('vendors/exampleMap', {
        user: req.user,
    })
});

router.post('/addShops', loggedIn, (req, res) => {
    const name = req.body.name;
    const user = req.user;
    const address = req.body.address;
    const location = req.body.location;
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const description = req.body.description;
    const img = req.body.imageURL; 
    Shop.create({
        name,
        address,
        location,
        rating: 0,
        latitude,
        longitude,
        description,
        imageLocation: img,
        isDeleted: 0,
        isRecommended: 1,
        VendorId: user.id,
    })
    req.flash('success', "This shop has been successfully added");
    res.redirect('/vendor/showShops');
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

router.post('/editShop/:id', loggedIn, (req, res) => {
    const name = req.body.name;
    const user = req.user;
    const address = req.body.shopAdd;
    const latitude = 1.282699;
    const longitude = 103.843908;
    const description = req.body.description;
    const rating = 0;
    const img = req.body.imageURL;
    Shop.findOne({
        where: {
            VendorId: user.id,
        }
    }).then((Shop) => {
        console.log(address);
        Shop.update({
            name: name,
            address: address,
            rating: rating,
            imageLocation: img, 
            description: description,
            imageLocation: img,
            isDeleted: 0,
            isRecommended: 1,
            latitude: latitude,
            longitude: longitude,
        })
        req.flash('success', 'Shop has been succcessfully added');
        res.redirect('/vendor/showShops');
    })

})

router.get('/addMenu', loggedIn, (req, res) => {
    const user = req.user;
    Shop.findAll({
        where: {
            VendorId: user.id,
        }
    }).then((shops) => {
        res.render('vendors/add_fooditems', {
            user: req.user,
            shop: shops
        })
    })
});


router.post('/addMenu', loggedIn, (req, res) => {
    const shopId = req.params.id;
    const name = req.body.name;
    const shop = req.body.shop.toString();
    const calories = req.body.calories;
    const description = req.body.description;
    const user = req.user;
    console.log(req.body.shop);
    const img = req.body.imageURL; 
    FoodItem.create({
        name: name,
        calories: calories,
        isRecommended: true,
        isDeleted: false,
        description: description,
        imageLocation: img,
        ShopId: shopId,
    })
    req.flash('success', 'Food has been succcessfully added');
    res.redirect('/vendor/showShops')
})

router.get('/:id/editMenu', loggedIn, (req, res) => {
    const shopId = req.params.id;
    const user = req.user;
    FoodItem.findOne({
        where: {
            id: shopId,
        }
    }).then((food) => {
        Shop.findOne({
            where: {
                id: shopId,
            }
        }).then((shop) => {
            res.render('vendors/edit_fooditems', {
                user: req.user,
                food: food,
                shop: shop,

            })
        })

    })
});

router.get('/showMenu', loggedIn, (req, res) => {
    const user = req.user;
    Vendor.findOne({
        where: {
            UserId: user.id,
        }
    }).then((vendor) => {
        Shop.findOne({
            where: {
                VendorId: vendor.id,
                isDeleted: false,
            }
        }).then((shop) => {
            FoodItem.findAll({
                where: {
                    ShopId: shop.id,
                    isDeleted: false,
                }
            }).then((food) => {
                console.log(shop.name);
                res.render('vendors/seeMenu', {
                    user: req.user,
                    food: food,
                    shops: shop,

                })
            })

        })

    })
});

router.get('/deleteShop/:id', loggedIn, (req, res) => {
    Shop.findOne({
        where: {
            id: req.params.id,
        }
    }).then((Shop) => 
    { 
        Shop.update({ 
            isDeleted: true,
        }), 
        res.redirect('/vendor/deleteMenu/:id')
    })
    req.flash('success', 'Shop has been succcessfully deleted');
    res.redirect('/vendor/showShops');
})

router.get('/deleteMenu/:id', loggedIn, (req, res) => {
    FoodItem.findAll({ 
        where: {
            id: req.params.id,
        }
    }).then(FoodItem => {
        FoodItem.update({ 
            isDeleted: true,
        })
    })
})


router.post('/upload', loggedIn, (req, res) => {
    // Creates user id directory for upload if not exist
    if (!fs.existsSync('./public/uploads/' + req.user.id)) {
        fs.mkdirSync('./public/uploads/' + req.user.id);
    }

    upload(req, res, (err) => {
        if (err) {
            res.json({ file: '/images/no-image.jpg', err: err });
            console.log(err); 
        } else {
            if (req.file === undefined) {
                res.json({ file: '/images/no-image.jpg', err: err });
            } else {
                res.json({ file: `/uploads/${req.user.id}/${req.file.filename}` });
            }
        }
    });
})

module.exports = router;
