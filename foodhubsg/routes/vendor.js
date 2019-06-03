const express = require('express');
const router = express.Router();
const loggedIn = require('../helpers/loggedIn');
const Vendor = require('../models/Vendor');
const FoodItem = require('../models/FoodItem');
const Shop = require('../models/Shop');
const fs = require('fs');
const upload = require('../helpers/ImageUpload');

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
    const vendor = "Chinatown"
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

router.post('/editShop/:id', loggedIn, (req, res) => {
    const name = req.body.name;
    const user = req.user;
    const address = req.body.shopAdd;
    const latitude = 1.282699;
    const longitude = 103.843908;
    const description = req.body.description;
    const rating = 4.0;
    const img = "/images/rand.jpeg";
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
            description: description,
            imageLocation: img,
            isDeleted: 0,
            isRecommended: 1,
            latitude: latitude,
            longitude: longitude,
        })
        res.locals.success = "Shop has been successfully added!";
        res.render('vendors/vendor_index', {
            user: req.user
        })
    })

})

router.get('/:id/addMenu', loggedIn, (req, res) => {
    const shopId = req.params.id;
    const user = req.user;
    Shop.findOne({
        where: {
            id: shopId,
        }
    }).then((shops) => {
        res.render('vendors/add_fooditems', {
            user: req.user,
            shop: shops
        })
    })
});


router.post('/:id/addMenu', loggedIn, (req, res) => {
    const shopId = req.params.id;
    const name = req.body.name;
    const shop = req.body.shop.toString();
    const calories = req.body.calories;
    const description = req.body.description;
    const user = req.user;
    console.log(req.body.shop);
    const img = "/images/nice-waffle.jpg"
    FoodItem.create({
        name: name,
        calories: calories,
        isRecommended: true,
        description: description,
        imageLocation: img,
        ShopId: shopId,
    })
    res.locals.success = "Food has been successfully added!";
    res.render('vendors/vendor_index', {
        user: req.user
    })
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
            }
        }).then((shop) => {
            FoodItem.findAll({
                where: {
                    ShopId: shop.id,
                }
            }).then((food) => {
                console.log(shop.name);
                res.render('vendors/seeMenu', {
                    user: req.user,
                    food: food,
                    shop: shop,

                })
            })

        })

    })
});

router.get('/deleteShop/:id', loggedIn, (req, res) => {
    const user = req.user; 
    Shop.findOne({
        where: {
            id: req.params.id,
        }
    }).then((shop) => {
        if (user.id == shop.VendorId){ 
            Shop.destroy({ 
                where: { 
                    id: req.params.id, 
                }
            })
        }
    })
    res.render('vendors/vendor_index', {
        user: req.user
    })
})

router.get('/deleteMenu/:id', loggedIn, (req, res) => {
    res.render('vendor/seeMenu', {
        user: req.user
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
        } else {
            if (req.file === undefined) {
                res.json({ file: '/images/no-image.jpg', err: err });
            } else {
                res.json({ file: `/uploads/${Shop.imageLocation}/${req.file.filename}` });
            }
        }
    });
})

module.exports = router;
