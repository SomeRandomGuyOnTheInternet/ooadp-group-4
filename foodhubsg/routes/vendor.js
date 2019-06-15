const express = require('express');
const router = express.Router();

const isVendor = require('../helpers/isVendor');
const Vendor = require('../models/User');
const FoodItem = require('../models/FoodItem');
const Shop = require('../models/Shop');
const getShopRatings = require('../helpers/getShopRating');

router.get('/settings', isVendor, (req, res) => {
    res.render('vendors/vendorSettings', {
        user: req.user,
        title: "Settings",
    })
});

router.post('/settings', isVendor, (req, res) => {
	const name = req.body.name;
	const email = req.body.email.toLowerCase();
	const password = req.body.password;
	
	var error;

	Vendor.update({		
         name: name, 
         email: email, 
         password: password
	},{
		where: { id: req.user.id }
    })
    .then(() => {		
        res.redirect('/vendor/settings'); 
        req.flash('success', 'Settings have been updated successfully');
        })
        
    .catch(err => console.log(err));
});


router.get('/allShops', isVendor, (req, res) => {
    Shop.findAll({
        where: {
            VendorId: req.user.id,
            isDeleted: false,
        }
    }).then((shops) => {
        res.render('vendors/allShops', {
            title: "View Shops",
            shops: shops,
            user: req.user,
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
    var id = req.params.id;
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
    Vendor.findOne({
        where: {
            id: req.user.id,
        }
    })
    .then((vendor) => {
        Shop.findOne({
            where: {
                VendorId: vendor.id,
                isDeleted: false,
            }
        })
        .then((shop) => {
            FoodItem.findAll({
                where: {
                    isDeleted: false,
                }
            })
            .then((food) => {
                res.render('vendors/allFoodItems', {
                    user: req.user,
                    title: "Show Menu",
                    food: food,
                    shops: shop,

                })
            })
        })
    })
});


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
        var food = FoodItem.findOne({
            attributes: ['ShopId'],  
            where: { id: id }, 
    }).then((food) => { 
         console.log(food); 
        FoodItem.findAll({ where: { ShopId: food.ShopId, isDeleted: false } })
        .then((foodItems) => {
            var rating = getShopRatings(foodItems);
            Shop.update(
                { 
                    rating,
                    isRecommended: (rating >= 4) ? true : false,
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
        rating: 1,
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
    const description = req.body.description;
    const imageLocation = req.body.imageURL;
    const isRecommended = (calories <= 500) ? true : false;
    const isDeleted = false;

    for (i = 0; i < shops.length; i++) {
        FoodItem.create({
            name,
            calories,
            isRecommended,
            isDeleted,
            description,
            imageLocation,
            ShopId: shops[i],                    
        })
        FoodItem.findAll({ where: { ShopId: shops[i] }, isDeleted: false})
        .then((foodItems) => {
            var rating = getShopRatings(foodItems);
            Shop.update(
                { 
                    rating: rating,
                    isRecommended: (rating >= 4) ? true : false,
                },
                { where: { id: foodItems[0].ShopId } }
            )
        });
    }

    req.flash('success', 'Food has been succcessfully added');
    res.redirect('/vendor/allShops')
})


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
            var rating = getShopRatings(foodItems);
            Shop.update(
                { 
                    rating,
                    isRecommended: (rating >= 4) ? true : false,
                },
                { where: { id: shop } }
            )
        });
        req.flash('success', 'Shop has been succcessfully edited');
        res.redirect('/vendor/allShops');
    });
})



module.exports = router;
