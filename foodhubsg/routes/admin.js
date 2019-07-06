const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const isAdmin = require('../helpers/isAdmin');
const groupVendors = require('../helpers/groupVendors');
const updateShopRating = require('../helpers/updateShopRating');

const Shop = require('../models/Shop');
const FoodItem = require('../models/FoodItem')
const User = require("../models/User");



router.get('/vendors', isAdmin, (req, res) => {
    User.findAll({
        where: { isVendor: true, isDeleted: false },
        include: [{
            model: Shop,
            where: { isDeleted: false },
            required: false,
        }],
        raw: true,
    })
    .then((vendors) => {
        var groupedVendors = groupVendors(vendors);

        User.findAll({
            where: { isVendor: true, isDeleted: true },
            include: [{
                model: Shop,
                where: { isDeleted: true },
                required: false,
            }],
            raw: true,
        })
        .then((deletedVendors) => {
            var groupedDeletedVendors = groupVendors(deletedVendors);
            if (Object.entries(groupVendors(deletedVendors)).length === 0 && groupVendors(deletedVendors).constructor === Object) groupedDeletedVendors = null;

            res.render('admin/vendors', {
                user: req.user,
                title: "Vendors",
                groupedVendors,
                groupedDeletedVendors
            })
        });
    });
});


router.get('/shops', isAdmin, (req, res) => {
    Shop.findAll({
        where: { isDeleted: false },
        order: [ ['name', 'ASC'] ]
    })
    .then((shops) => {
        Shop.findAll({
            where: { isDeleted: true },
            include: [{
                model: User,
                where: { isVendor: true, isDeleted: false },
                required: true,
            }],
            raw: true,
        })
        .then((deletedShops) => {
            res.render('admin/shops', {
                user: req.user,
                title: "Shops",
                shops,
                deletedShops
            })
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
            where: { 
                ShopId: id,
                isDeleted: false,
            },
        }),
        User.findAll({ where: { isVendor: true } }),
    ])
    .then((data) => {
        for (i = 0; i < data[2].length; i++) {
            if (data[2][i].id == data[0].VendorId) {
                data[2].splice(i, 1);
                break;
            }
        }

        res.render('admin/editShop', {
            title: "Edit Shop",
            shop: data[0],
            foodItems: data[1],
            vendors: data[2],
            user: req.user,
        });
    })
    .catch((err) => {
        req.flash('error', "That shop does not exist!");
        res.redirect('/admin/vendors');
    });
});


router.get('/addShop', isAdmin, (req, res) => {
    User.findAll({ where: { isVendor: true } })
    .then((vendors) => {
        res.render('admin/addShop', {
            user: req.user,
            title: "Add Shop",
            vendors
        })
    });
});


router.get('/addFoodItem/:currentShopId?', isAdmin, (req, res) => {
    const currentShopId = req.params.currentShopId;

    User.findAll({
        where: { isVendor: true },
        include: [{
            model: Shop,
            where: { isDeleted: false },
            required: true,
        }],
        raw: true,
    })
    .then((vendors) => {
        var groupedVendors = groupVendors(vendors);
        
        res.render('admin/addFoodItem', {
            user: req.user,
            title: "Add Food",
            groupedVendors,
            currentShopId
        })
    })
});


router.get('/editFoodItem/:id', isAdmin, (req, res) => {
    const id = req.params.id;

    FoodItem.findOne({
        where: { id }
    })
    .then((food) => {
        if (food) {
            Shop.findOne({  where: { id: food.ShopId } })
            .then((currentShop) => {
                Shop.findAll({
                    where: {
                        isDeleted: false,
                        VendorId: currentShop.VendorId,
                    }
                })
                .then((shops) => {
                    res.render('admin/editFoodItem', {
                        user: req.user,
                        title: "Edit Menu",
                        food,
                        currentShop,
                        shops,
                    });
                });
            });
        } else {
            req.flash('error', "That food does not exist!");
            res.redirect('/admin/vendors');
        };
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
    const isAdmin = isBanned = isDeleted = false;
    const isVendor = true; 
    var error;

    var form = { name, email };

	User.findOne({ where: { email } })
    .then(function (user) {
        if (user) { error = 'This email has already been registered'; };
        if (password.length < 6) { error = 'Password must contain at least 6 characters'; };
        if (password != confirmPassword) { error = 'Passwords do not match'; };

		if (!error) {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
                    User.create({
						name, email, password: hash, isDeleted, isVendor, isAdmin, isBanned,
                    })
                    .then(() => {  
                        req.flash('success', "You have successfully added a new vendor!");
                        res.redirect('/admin/vendors');
                    });
                });
            });
		} else {
            User.findAll({
                where: { isVendor: true },
                include: [{
                    model: Shop,
                }],
                raw: true
            })
            .then((vendors) => {
                var groupedVendors = groupVendors(vendors);

                res.locals.error = error;
                res.render('admin/vendors', {
                    user: req.user,
                    title: "Vendors",
                    groupedVendors,
                    form
                });
            });
		};
    });
}); 


router.post('/deleteVendor/:id', (req, res) => {
    const id = req.params.id;
    const isDeleted = true;

    User.update(
        { isDeleted },
        { where: { id } }
    )
    .then(function () {
        Shop.update(
            { isDeleted },
            { where: { VendorId: id } }
        )
        .then(function () {
            req.flash('success', 'Shop has been succcessfully deleted!');
            res.redirect('/admin/vendors');
        });
    });
}); 


router.post('/undeleteVendor/:id', (req, res) => {
    const id = req.params.id;
    const isDeleted = false;

    User.update(
        { isDeleted },
        { where: { id } }
    )
    .then(function () {
        Shop.update(
            { isDeleted },
            { where: { VendorId: id } }
        )
        .then(function () {
            req.flash('success', 'Vendor has been succcessfully reinstated!');
            res.redirect('/admin/vendors');
        });
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
        latitude,
        longitude,
        description,
        imageLocation,
        isDeleted: false,
        isRecommended: false,
        VendorId: vendorId,
    })
    .then((shop) => {
        req.flash('success', "This shop has been successfully added!");
        res.redirect(`/admin/editShop/${shop.id}`);
    });
});


router.post('/editShop/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const vendorId = req.body.vendor;
    const currentVendor = req.body.currentVendor;
    const address = req.body.address;
    const location = req.body.location;
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const description = req.body.description;
    const imageLocation = req.body.imageURL;
    
    if (currentVendor == vendorId) {
        Shop.update({
            name,
            address,
            description,
            imageLocation,
            location,
            latitude,
            longitude,
        },{
            where: {
                VendorId: vendorId,
                id,
            },
        });
    } else {
        Shop.update(
            {
                name,
                address,
                description,
                imageLocation,
                location,
                latitude,
                longitude,
                VendorId: vendorId,
            },{
                where: { id },
            }
        );
    };

    req.flash('success', 'Shop has been succcessfully edited!');
    res.redirect(`/admin/editShop/${id}`);
});


router.post('/deleteShop/:id', (req, res) => {
    FoodItem.update(
        { isDeleted: true, },
        { where: { ShopId: req.params.id } }
    )
    .then(() => {
        Shop.update(
            { isDeleted: true },
            { where: { id: req.params.id } }
        );
    });

    req.flash('success', 'Shop has been succcessfully deleted!');
    res.redirect('/admin/shops');
});


router.post('/undeleteShop/:id', (req, res) => {
    FoodItem.update(
        { isDeleted: false },
        { where: { ShopId: req.params.id } }
    )
    .then(() => {
        Shop.update(
            { isDeleted: false },
            { where: { id: req.params.id } }
        );
    });
    
    req.flash('success', 'Shop has been succcessfully reinstated!');
    res.redirect('/admin/shops');
});


router.post('/addFoodItem/:id?', isAdmin, (req, res) => {
    const name = req.body.name;
    const shops = (req.body.shop.toString()).split(',');
    const calories = req.body.calories;
    const imageLocation = req.body.imageURL;
    const isRecommended = (calories <= 500) ? true : false;
    const isDeleted = false;
    var error;

    if (calories > 1500 || calories < 1) error = 'Please enter a valid number of calories';

    if (!error) {
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
    } else {
        req.flash('error', error);
        res.redirect(`/admin/addFoodItem`);
    }
});


router.post('/editFoodItem/:id', isAdmin, (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const shopId = req.body.shopId;
    const calories = req.body.calories;
    const imageLocation = req.body.imageURL;
    const isRecommended = (calories <= 500) ? true : false;
    const isDeleted = false;
    var error;

    if (calories > 1500 || calories < 1) error = 'Please enter a valid number of calories';

    if (!error) {
        FoodItem.update(
            {
                name,
                calories,
                isRecommended,
                isDeleted,
                imageLocation,
            },{
                where: { id }
            }
        )
        .then((foodItem) => { updateShopRating(shopId); })

        req.flash('success', 'Food has been succcessfully edited!');
        res.redirect(`/admin/editShop/${shopId}`);
    } else {
        req.flash('error', error);
        res.redirect(`/admin/editFoodItem/${id}`);
    }
});


router.post('/deleteFoodItem/:id', isAdmin, (req, res) => {
    const id = req.params.id;
    const isDeleted = true;

    FoodItem.findOne({ where: { id } })
    .then((foodItem) => {
        var foodItem = foodItem;

        FoodItem.update(
            { isDeleted },
            { where: { id } }
        )
        .then((deletedFoodItem) => { updateShopRating(foodItem.ShopId); })

        req.flash('success', 'Food has been succcessfully deleted!');
        res.redirect(`/admin/editShop/${foodItem.ShopId}`);
    });
});



module.exports = router;
