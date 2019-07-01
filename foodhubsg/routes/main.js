const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const router = express.Router();

const isloggedOut = require('../helpers/isloggedOut');
const upload = require('../helpers/imageUpload');

const User = require('../models/User');
const FoodItem = require('../models/FoodItem');
const Shop = require('../models/Shop');
const Sequelize = require('sequelize'); 
const Op = Sequelize.Op; 


router.get('/register', isloggedOut, (req, res) => {
	res.render('register', {title: "Register"})
});


router.get('/login', isloggedOut, (req, res) => {
	res.render('login', {
		user: req.user,
		title: "Login"
	})
});


router.get("/google", isloggedOut, passport.authenticate("google", {
	scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));


router.get('/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: './',
        failureRedirect: './login'
}));


router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});


router.get('/', (req, res) => {
	res.render('redirect', { title: "Redirecting..." })
});


router.post('/', (req, res) => {
	var location = (req.body.location != "null") ? req.body.location : null;
	var latitude = (req.body.latitude) ? parseFloat(req.body.latitude) : null; 
	var longitude = (req.body.longitude) ? parseFloat(req.body.longitude) : null;
	
	if (!req.user) {
		res.redirect('/logout')
	} else {
		User.update(
			{ location, latitude, longitude },
			{ where: { id: req.user.id } },
		)
		.then(function () {
			if (req.user.isAdmin) res.redirect('/admin/vendors');
			else if (req.user.isVendor) res.redirect('/vendor/allShops');
			else res.redirect('/user');
		});
	}
});


router.post('/register', isloggedOut, (req, res) => {
	const name = req.body.name;
	const weight = req.body.weight;
	const height = req.body.height;
	const email = req.body.email.toLowerCase();
	const password = req.body.password;
	const isAdmin = isBanned = isVendor = isDeleted = false;
	var error;

	var form = {
		name: name,
		weight: weight,
		height: height,
		email: email
	};

	User.findOne({
		where: { email }
	})
	.then(function (user) {
		if (user) { 
			if (!user.password) error = 'This email has already been registered through Google';
			else error = 'This email has already been registered'; 
		};
		if (password.length < 6) error = 'Password must contain at least 6 characters';
		if (height > 3 || weight < 0.5) error = 'Please enter a valid height value';
		if (weight > 200 || weight < 20) error = 'Please enter a valid weight value';

		if (typeof error === 'undefined') {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
					User.create({
						name, email, password: hash, weight, height, isAdmin, isBanned, isVendor
					})
					.then(function () {
						req.flash('success', "Your email has been successfully registered!");
						res.redirect('./login');
					})
				});
			});
		} else {
			req.flash('error', error);
			res.render('register', { 
				title: "Register",
				form
			});
		};
	});
});


router.post('/login', isloggedOut, (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: './',
		failureRedirect: './login',
		failureFlash: true
	})(req, res, next);
});


router.post('/upload', (req, res) => {
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
