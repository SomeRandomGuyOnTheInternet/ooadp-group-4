const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const isAdmin = require('../helpers/isAdmin');
const groupVendors = require('../helpers/groupVendors');

const Shop = require('../models/Shop');
const FoodItem = require('../models/FoodItem')
const User = require("../models/User"); 



router.get('/vendors', isAdmin, (req, res) => {
    User.findAll({
        include: [{
            model: Shop,
            required: true,
        }],
        raw: true
    })
    .then((vendors) => {
        var groupedVendors = groupVendors(vendors)
        res.render('admin/vendors', {
            user: req.user,
            title: "Vendors",
            groupedVendors
        })
    });
});


router.get('/shops', isAdmin, (req, res) => {
    Shop.findAll()
    .then(function (shops) {
        res.render('admin/shops', {
            user: req.user,
            title: "Shops",
            shops: shops,
        })
    })
});


router.get('/editShop/:id', isAdmin, (req, res) => {
    var id = req.params.id;

    Promise.all([
        Shop.findOne({
            where: { id },
            include: [{
                model: User,
                required: true,
            }],
        }),
        FoodItem.findAll({
            where: { ShopId: id },
        }),
        User.findAll({
            where: { 
                isVendor: true, 

            }
        }),
    ])
    .then((data) => {
        res.render('admin/editShop', {
            title: "Edit Shop",
            shop: data[0],
            foodItems: data[1],
            vendors: data[2],
            user: req.user,
        });
    })
    .catch((err) => {
        console.log(err);
        req.flash('error', "That shop does not exist!");
        res.redirect('/admin/vendors');
    });
});


router.get('/addShop', isAdmin, (req, res) => {
    User.findAll({
        where: {
            isVendor: true,
        }
    })
    .then((vendors) => {
        res.render('admin/addShop', {
            user: req.user,
            title: "Add Shop",
            vendors
        })
    });
});


router.get('/addFoodItem', isAdmin, (req, res) => {
    Shop.findAll({
        where: {
            VendorId: user.id,
            isDeleted: false,
        }
    })
    .then((shops) => {
        res.render('admin/addFoodItem', {
            user: req.user,
            title: "Add Food",
            shop: shops
        })
    })
});


router.get('/editFoodItem/:id', isAdmin, (req, res) => {
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
            res.render('admin/editFoodItem', {
                user: req.user,
                title: "Edit Menu",
                food: food,
                shop: shop,
            })
        });
    })
});


router.get('/faq', isAdmin, (req, res) => {
    res.render('admin/faq'), {
        user: req.user,
        title: "FAQ",
    }
});


router.post('/vendors', (req, res) => {
    const name = req.body.name;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const isAdmin = isBanned = false;
    const isVendor = true; 
	var error;

	User.findOne({
		where: { email, name }
	}).then(function (user) {
        if (user) { error = 'This email or name has already been registered'; };
        if (password.length < 6) { error = 'Password must contain at least 6 characters'; };
        if (password != confirmPassword) { error = 'Passwords do not match'; };

		if (typeof error === 'undefined') {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
                    User.create({
						name, email, password: hash, isVendor, isAdmin, isBanned,
                    })
                    .then(() => {  
                        req.flash('success', "You have successfully added a new vendor!");
                        res.redirect('/admin/vendors');
                    });
                });
            });
		} else {
            req.flash('error', error);
            res.redirect('/admin/vendors');
		};
    });
}); 


router.post('/addShop', (req, res) => {
    const name = req.body.name;
    const vendorId = req.body.vendor;
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
        VendorId: vendorId,
    })

    req.flash('success', "This shop has been successfully added");
    res.redirect('/admin/shops');
});


router.post('/editShop/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const vendorId = req.body.vendor;
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
            VendorId: vendorId,
            id,
        },
    })
    .then(() => {
        req.flash('success', 'Shop has been succcessfully edited!');
        res.redirect('/admin/shops');
    });
});


router.post('/addFoodItem', isAdmin, (req, res) => {
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
        FoodItem.findAll({ where: { ShopId: shops[i] } })
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
    }

    req.flash('success', 'Food has been succcessfully added');
    res.redirect('/admin/shops')
})


router.post('/editFoodItem/:id', isAdmin, (req, res) => {
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
        req.flash('success', 'Shop has been succcessfully edited');
        res.redirect('/vendor/shops');
    });
})



module.exports = router;
