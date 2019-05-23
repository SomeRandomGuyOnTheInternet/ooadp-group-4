const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();
const loggedOut = require('../helpers/loggedOut');
const loggedIn = require('../helpers/loggedIn');
const User = require('../models/Users');


router.get('/register', loggedOut, (req, res) => {
	res.render('register')
});

router.post('/register', (req, res) => {
	const name = req.body.name;
	const weight = req.body.weight;
	const height = req.body.height;
	const email = req.body.email.toLowerCase();
	const password = req.body.password;
	const isAdmin = isBanned = isVendor = false;
	var error;

	User.findOne({
		where: { email }
	}).then(function (user) {
		if (user) { error = 'This email has already been registered.'; };
		if (password.length < 6) { error = 'Password must contain at least 6 characters'; };
		if (height > 3 || weight < 0.5) { error = 'Please enter a valid height value'; };
		if (weight > 200 || weight < 20) { error = 'Please enter a valid weight value'; };

		if (typeof error === 'undefined') {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
					User.create({
						name, email, password: hash, weight, height, isAdmin, isBanned, isVendor
					}).then(function () {
						res.locals.success = "Your email has been successfully registered!";
						res.redirect('./login');
					})
				});
			});
		} else {
			res.locals.error = error;
			res.render('register', {
				user: req.user
			});
		};
	});
});

router.get('/login', loggedOut, (req, res) => {
	console.log(req.session.user)
	res.render('login', {
		user: req.user
	})
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: './',
		failureRedirect: './login',
		failureFlash: true
	})(req, res, next);
});

router.get('/', loggedIn, (req, res) => {
	if (req.user.isAdmin === true) {
		res.redirect('/admin/vendors')
	} else if (req.user.isVendor === true) {
		res.redirect('/vendor/showShops')
	} else {
		console.log(req.user)
		res.redirect('/user/')
	}
});

router.get('/about', (req, res) => {
	const title = 'About';
	const developer = 'your mom ha gottem';

	res.locals.success = "This works! Yaaaaaay";

	res.render('about', {
		title: title,
		developer: developer,
		user: req.user
	});
});

// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

module.exports = router;
