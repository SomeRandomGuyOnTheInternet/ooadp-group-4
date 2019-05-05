const express = require('express');
const passport = require('passport');
const router = express.Router();
const sequelize = require('../config/DBConfig');
const User = require('../models/Users');


router.get('/', (req, res) => {
	const title = 'Video Jotter';
	sequelize.query("SELECT * FROM Shops").then(ShopsRows => {
		console.log(ShopsRows)
	})
	res.render('index', {
		title: title,
		user: req.session.user
	}) // renders views/index.handlebars
});

router.get('/register', (req, res) => {
	res.render('register')
});

router.post('/register', (req, res) => {
	const name = req.body.name;
	const weight = req.body.weight;
	const height = req.body.height;
	const email = req.body.email;
	const password = req.body.password;
	const isAdmin, isVendor, isBanned = false;
	var error;

	User.findOne({
		where: { email }
	}).then(function (user) {
		if (user) { error = 'This email has already been registered.'; };
		if (password.length < 4) { error = 'Password must contain at least 4 characters'; };
		if (password !== password2) { error = 'Passwords do not match'; };

		if (typeof error === 'undefined') {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
					User.create({
						name, email, password: hash,
					}).then(function () {
						res.locals.success = "You've been logged in!";
						res.redirect('./login', { 
							user: req.session.user 
						});
					})
				});
			});
		} else {
			res.locals.error = error;
			res.render('register', {
				name,
				email,
				user: req.session.user 
			});
		};
	});
});

router.get('/login', (req, res) => {
	console.log(req.session.user)
	res.render('login', {
		user: req.session.user
	})
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/video/listVideos', // Route to /video/listVideos URL 
		failureRedirect: './login', // Route to /login URL
		failureFlash: true
	})(req, res, next);
});

router.get('/about', (req, res) => {
	const title = 'About';
	const developer = 'your mom ha gottem';

	res.locals.success = "This works! Yaaaaaay";

	res.render('about', {
		title: title,
		developer: developer,
		user: req.session.user
	});
});

// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
