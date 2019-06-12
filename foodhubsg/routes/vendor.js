const express = require('express');
const fs = require('fs');
const router = express.Router();

const loggedIn = require('../helpers/loggedIn');
const upload = require('../helpers/imageUpload');

const Vendor = require('../models/Vendor');
const FoodItem = require('../models/FoodItem');
const Shop = require('../models/Shop');
const getFoodRatings = require('../helpers/foodRating');
const getShopRatings = require('../helpers/shopRating');

router.get('/showShops', loggedIn, (req, res) => {
    Shop.findAll({
        where: {
            VendorId: req.user.id,
            isDeleted: false,
        }
    }).then((shops) => {
        res.render('vendors/vendor_index', {
            title: "View Shops",
            shops: shops,
            user: req.user,
        });
    })

})



router.get('/addShops', loggedIn, (req, res) => {
    res.render('vendors/addShop', {
        user: req.user,
        title: "Add Shop",
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
    let list_of_items = 0;
    Shop.create({
        name,
        address,
        location,
        rating: 0,
        latitude,
        longitude,
        description,
        menuList: list_of_items,
        totalCalories: 0, 
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
            where: {
                ShopId: id,

            }

        })
    ])
        .then((data) => {
            res.render('vendors/editShop', {
                title: "Edit Shop",
                shop: data[0],
                foodItems: data[1],
                user: req.user,
            });
        });
})

router.post('/editShop/:id', loggedIn, (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const user = req.user;
    const address = req.body.address;
    const location = req.body.location;
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const description = req.body.description;
    const img = req.body.imageURL;

    Shop.update({
        name: name,
        address: address,
        description: description,
        imageLocation: img,
        location: location,
        latitude: latitude,
        longitude: longitude,
    },
        {
            where: { 
                VendorId: user.id, 
                id, 
            },
        })
        .then(() => {
            req.flash('success', 'Shop has been succcessfully edited');
            res.redirect('/vendor/showShops');
        });
})


router.get('/addMenu', loggedIn, (req, res) => {
    const user = req.user;
    Shop.findAll({
        where: {
            VendorId: user.id,
            isDeleted: false,
        }
    }).then((shops) => {
        res.render('vendors/add_fooditems', {
            user: req.user,
            title: "Add Food",
            shop: shops
        })
    })
});


router.post('/addMenu', loggedIn, (req, res) => {
    const name = req.body.name;
    const shops = (req.body.shop.toString()).split(',');
    const calories = req.body.calories;
    const description = req.body.description;
    const img = req.body.imageURL;
    if (shop.length == 1) { 
        let id = shop[0]; 
        FoodItem.create({
            name: name,
            calories: calories,
            isRecommended: true,
            isDeleted: false,
            description: description,
            imageLocation: img,
            ShopId: id,
        })
        Shop.findOne({
            attribute: ['menuList'], 

            where : {
                id: id, 
            }
        }).then((itemList) => {
            let id = itemList.id; 
            let menuitems = itemList.menuList;
            menuitems = menuitems + 1;
            let food = getFoodRatings(calories);
            let rating = getShopRatings(food, menuitems);
            console.log(rating)
            Shop.update({
                rating: rating,
                menuList: menuitems,
            },
                {
                    where: { id: id },
                }).then(() => {
                    req.flash('success', 'Food has been succcessfully added');

                })
        })
    }

    else { 

        for (i = 0; i < list_of_shops.length; i++) { 
        FoodItem.create({
            name: name,
            calories: calories,
            isRecommended: true,
            isDeleted: false,
            description: description,
            imageLocation: img,
            ShopId: list_of_shops[i],
        })
        Shop.findOne({
            attribute: ['menuList'], 

            where : {
                id: list_of_shops[i], 
            }
        }).then((itemList) => {
            let id = itemList.id; 
            let menuitems = itemList.menuList;
            menuitems = menuitems + 1;
            let food = getFoodRatings(calories);
            let rating = getShopRatings(food, menuitems);
            Shop.update({
                rating: rating,
                menuList: menuitems,
            },
                {
                    where: { id: id },
                }).then(() => {
                    req.flash('success', 'Food has been succcessfully added');

                })
        })
    }
    }
    
    res.redirect('/vendor/showShops')
})

router.get('/editMenu/:id', loggedIn, (req, res) => {
    const id = req.params.id;
    const user = req.user;
    FoodItem.findOne({
        where: {
            id: id,
        }
    }).then((food) => {
        const item = food.ShopId;
        Shop.findOne({
            where: {
                id: item,
            }
        }).then((shop) => {
            res.render('vendors/edit_fooditems', {
                user: req.user,
                title: "Edit Menu",
                food: food,
                shop: shop,

            })
        })

    })
});

router.post('/editMenu/:id', loggedIn, (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const calories = req.body.calories;
    const shop = req.body.shop;
    const img = req.body.imageURL;

    FoodItem.update({
        name: name,
        calories: calories,
        imageLocation: img,
        isDeleted: 0,
        isRecommended: 1,
    },
    {
        where: { ShopId: shop, id: id, },
    })
        .then(() => {
            req.flash('success', 'Shop has been succcessfully edited');
            res.redirect('/vendor/showShops');
        });
})

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
                    isDeleted: false,
                }
            }).then((food) => {
                res.render('vendors/seeMenu', {
                    user: req.user,
                    title: "Show Menu",
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
    }).then((Shop) => {
        Shop.update({
            isDeleted: true,
        })
    })
    req.flash('success', 'Shop has been succcessfully deleted');
    res.redirect('/vendor/showShops');
})

router.get('/deleteMenu/:id', loggedIn, (req, res) => {
    FoodItem.update({
        isDeleted: 1,
    },
        {
            where: { id: req.params.id, },
        })
        .then(() => {
            req.flash('success', 'Shop has been succcessfully edited');
            res.redirect('/vendor/showMenu');
        });
})

router.post('/upload', loggedIn, (req, res) => {
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
