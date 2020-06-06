const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const isVendor = require('../helpers').isVendor;
const getShopRatings = require('../helpers').getShopRatings;
const updateShopRating = require('../helpers').updateShopRating;

const Vendor = require('../models/User.js');
const FoodItem = require('../models/FoodItem.js');
const Shop = require('../models/Shop.js');




router.get('/settings', isVendor, (req, res) => {
    res.render('vendors/vendorSettings', {
        user: req.user,
        title: "Settings",
    })
});


router.post('/settings', isVendor, (req, res) => {

    let email = req.body.email.toLowerCase();

    let password = req.body.password;

    let error;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            Vendor.update({
                email: email,
                password: hash,
            }, {
                    where: { id: req.user.id }
                })

        });
    })
    req.flash('success', 'Settings have been updated successfully');
    res.redirect('/vendor/settings');

});


router.get('/allShops', isVendor, (req, res) => {
    Shop.findAll({
        where: {
            VendorId: req.user.id,
            isDeleted: false,
        }
    }).then((shops) => {
        let query_list = []
        for (i = 0; i < shops.length; i++) {
            query_list.push(shops[i].name);
        }
        res.render('vendors/allShops', {
            title: "View Shops",
            shops: shops,
            user: req.user,
            tags: query_list
        });
    })
})


router.get('/addShop', isVendor, (req, res) => {
    res.render('vendors/addShop', {
        user: req.user,
        title: "Add Shop",
    })
});


router.get('/editShop/:id', isVendor, (req, res) => {
    let id = req.params.id;
    Promise.all([
        Shop.findOne({
            where: { id }
        }),
        FoodItem.findAll({
            where: {
                ShopId: id,
                isDeleted: false,
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
});


router.get('/deleteShop/:id', isVendor, (req, res) => {
    Shop.findOne({
        where: {
            id: req.params.id,
        }
    })
    .then((Shop) => {
        Shop.update({
            isDeleted: true,
        })
    });
    req.flash('success', 'Shop has been succcessfully deleted');
    res.redirect('/vendor/allShops');
});


router.get('/allFoodItems', isVendor, (req, res) => {
    // Shop.findOne({
    //     where: {
    //         VendorId: req.user.id,
    //         isDeleted: false,
    //     }
    // }).then((shop) => {

    FoodItem.findAll({
        where: {
            isDeleted: false,
        },
        include: [{
            model: Shop,
            where: {
                VendorId: req.user.id,
            },
            required: true,
        }],
    }).then((food) => {
        let query_list = []
        for (i = 0; i < food.length; i++) {
            query_list.push(food[i].name);
        }
        res.render('vendors/allFoodItems', {
            user: req.user,
            title: "Show Menu",
            food: food,
            tags: query_list
        })
    })
})
// })


router.get('/addFoodItem', isVendor, (req, res) => {
    const user = req.user;
    Shop.findAll({
        where: {
            VendorId: user.id,
            isDeleted: false,
        }
    })
        .then((shops) => {
            res.render('vendors/addFoodItem', {
                user: req.user,
                title: "Add Food",
                shop: shops
            })
        })
});


router.get('/editFoodItem/:id', isVendor, (req, res) => {
    const id = req.params.id;
    FoodItem.findOne({
        where: {
            id: id,
        }
    })

        .then((food) => {
            Shop.findOne({
                where: {
                    id: food.ShopId,
                }
            }).
                then((shop) => {
                    res.render('vendors/editFoodItem', {
                        user: req.user,
                        title: "Edit Menu",
                        food: food,
                        shop: shop,

                    })
                });
        })
});


router.get('/deleteFoodItem/:id', isVendor, (req, res) => {
    FoodItem.update({
        isDeleted: true,
    },
        {
            where: { id: req.params.id, },
        })
        .then((id) => {
            let food = FoodItem.findOne({
                attributes: ['ShopId'],
                where: { id: id },
            }).then((food) => {
                FoodItem.findAll({ where: { ShopId: food.ShopId, isDeleted: false } })
                    .then((foodItems) => {
                        let rating = getShopRatings(foodItems);
                        Shop.update(
                            {
                                rating,
                                isRecommended: (rating >= 3) ? true : false,
                            },
                            { where: { id: foodItems[0].ShopId } }
                        )
                    });
            })

            req.flash('success', 'Shop has been succcessfully edited');
            res.redirect('/vendor/allFoodItems');
        });
})


router.post('/addShop', isVendor, (req, res) => {
    const name = req.body.name;
    const user = req.user;
    const address = req.body.address;
    const location = req.body.location;
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const description = req.body.description;
    const imageLocation = req.body.imageURL;

    Shop.create({
        name,
        address,
        location,
        latitude,
        longitude,
        description,
        imageLocation,
        isDeleted: false,
        isRecommended: false,
        VendorId: user.id,
    })
    req.flash('success', "This shop has been successfully added");
    res.redirect('/vendor/allShops');
});


router.post('/editShop/:id', isVendor, (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const user = req.user;
    const address = req.body.address;
    const location = req.body.location;
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const description = req.body.description;
    const imageLocation = req.body.imageURL;

    Shop.update({
        name,
        address,
        description,
        imageLocation,
        location,
        latitude,
        longitude,
    },
        {
            where: {
                VendorId: user.id,
                id,
            },
        })
        .then(() => {
            req.flash('success', 'Shop has been succcessfully edited');
            res.redirect('/vendor/allShops');
        });
})


router.post('/addFoodItem', isVendor, (req, res) => {
    const name = req.body.name;
    const shops = (req.body.shop.toString()).split(',');
    const calories = req.body.calories;
    const imageLocation = req.body.imageURL;
    const isRecommended = (calories <= 500) ? true : false;
    const isDeleted = false;

    for (i = 0; i < shops.length; i++) {
        FoodItem.create({
            name,
            calories,
            isRecommended,
            isDeleted,
            imageLocation,
            ShopId: shops[i],
        })
            .then((foodItem) => { updateShopRating(foodItem.ShopId) });
    };

    req.flash('success', 'Food has been succcessfully added!');
    res.redirect('/admin/vendors');
});


router.post('/editFoodItem/:id', isVendor, (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const calories = req.body.calories;
    const shop = req.body.shop;
    const imageLocation = req.body.imageURL;

    FoodItem.update({
        name,
        calories,
        imageLocation,
        isRecommended: (calories <= 500) ? true : false,
        isDeleted: false,
    },
        {
            where: { ShopId: shop, id: id, },
        })
        .then(() => {
            FoodItem.findAll({ where: { ShopId: shop, isDeleted: false } })
                .then((foodItems) => {
                    let rating = getShopRatings(foodItems);

                    Shop.update(
                        {
                            rating,
                            isRecommended: (rating >= 3) ? true : false,
                        },
                        { where: { id: shop } }
                    )
                });
            req.flash('success', 'Shop has been succcessfully edited');
            res.redirect('/vendor/allShops');
        });
})


router.get('/delete/:id', isVendor, (req, res) => {
    Shop.update({
        isDeleted: 1,


    },
        {
            where: { VendorId: req.params.id }
        }).then((shop) => {
            FoodItem.update({
                isDeleted: 1
            },

                { where: { ShopId: shop.id } }
            )
        }).then(() => {
            Vendor.destroy({
                where: {
                    id: req.params.id,
                }
            })
        })

})


router.post('/searchFoodItems', async (req, res) => {
    search = req.body.search;
    let food = await FoodItem.findAll({
        where: {
            isDeleted: false,
        },
        include: [{
            model: Shop,
            where: {
                VendorId: req.user.id,
            },
            required: true,
        }]
    })
    let query_list = []
    for (i = 0; i < food.length; i++) {
        query_list.push(food[i].name);
    }
    let search_results = await FoodItem.findAll({
        limit: 10,
        where: {
            name: {
                [Op.like]: '%' + search + '%'
            }
        },
        include: [{
            model: Shop,
            where: {
                VendorId: req.user.id,
            },
            required: true,
        }]
    })
    res.render('vendors/queryFood', {
        result: search_results,
        tags: query_list,
        user: req.user,
    }
    )

})


router.post('/searchShops', async (req, res) => {
    search = req.body.search;

    let shops = await Shop.findAll({
        where: {
            VendorId: req.user.id,
            isDeleted: false,
        }

    })
    let query_list = []
    for (i = 0; i < shops.length; i++) {
        query_list.push(shops[i].name);

    }


    let search_results = await Shop.findAll({
        limit: 10,
        where: {
            VendorId: req.user.id,
            name: {
                [Op.like]: '%' + search + '%'
            }
        }
    })
    res.render('vendors/queryShops', {
        result: search_results,
        user: req.user,
        tags: query_list
    })
})



module.exports = router;
