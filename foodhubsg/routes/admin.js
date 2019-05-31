const express = require('express');
const router = express.Router();
const loggedIn = require('../helpers/loggedIn');
const Shop = require('../models/Shop');
const FoodItem = require('../models/FoodItem')
const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const User = require("../models/User"); 

router.get('/vendors', loggedIn, (req, res) => {
    res.render('admin/vendors', {
        user: req.user,
    })
});

router.get('/shops', loggedIn, (req, res) => {
    Shop.findAll()
    .then(function (shops) {
        res.render('admin/shops', {
            user: req.user,
            shops: shops,
        })
    })
})

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
            res.render('admin/editShop', {
                shop: data[0],
                foodItems: data[1],
                user: req.user,
            });
        });
})

router.get('/addShop', loggedIn, (req, res) => {
    res.render('admin/addShop', {
        user: req.user,
    })
})

router.post('/vendors', loggedIn, (req, res) => {
    const name = req.body.name;
	const email = req.body.email.toLowerCase();
	const password = req.body.password;
    const isAdmin = isBanned = false;
    const isVendor = true; 
	var error;

	User.findOne({
		where: { email }
	}).then(function (user) {
		if (user) { error = 'This email has already been registered'; };
		if (password.length < 6) { error = 'Password must contain at least 6 characters'; };

		if (typeof error === 'undefined') {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
                    User.create({
						name, email, password: hash, isVendor: true,
                    }).then(() => {
                        User.findOne({
                            where: { email }
                        }).then((user) => {
                            Vendor.create({
                                id: user.id,
                                UserId: user.id,
                            }).then(() => {  
                                res.locals.error = error;
                                res.render('admin/vendors', {
                                    user: req.user
                                });
                            });
                        });
                    });
                });
            });
		} else {
			res.locals.error = error;
			res.render('admin/vendors', {
				user: req.user
			});
		};
    });
    
}); 


router.get('/faq', loggedIn, (req, res) => {
    res.render('admin/faq'), {
        user: req.user
    }

});

module.exports = router;
