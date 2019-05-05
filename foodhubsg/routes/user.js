const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const User = require('../models/Users');


router.get('/register', (req, res) => {
    res.render('/register', {
        name,
        user: req.session.user,
    });
});

router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    var error;

    User.findOne({ where: { email }
        }).then(function(user) {
            if (user) { error = 'This email has already been registered.'; };
            if (password.length < 4) { error = 'Password must contain at least 4 characters'; };
            if (password !== password2) { error = 'Passwords do not match'; };

            if (typeof error === 'undefined') {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        User.create({ name, email, password: hash,
                        }).then(function() {
                            res.locals.success = "You've been logged in!";
                            res.redirect('./login');
                        })
                    });
                });
            } else {
                res.locals.error = error;
                res.render('/register', {
                    name,
                    email,
                    user: req.session.user
                });
            };
        });
});

router.get('/login', (req, res) => {
    const title = 'Login';
    res.render('/login', {
        title: title,
        user: req.session.user
    }) // renders views/index.login
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/video/listVideos', // Route to /video/listVideos URL 
        failureRedirect: './login', // Route to /login URL
        failureFlash: true
    })(req, res, next);
});

// router.post('/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     let message = "";

//     User.findOne({ where: { email } })
//         .then(function(user) {
//             if (user) {
//                 bcrypt.compare(password, user.password, function(err, res) {
//                     if (res === true) {
//                         message = "It works yaaaaaay";
//                         console.log("hi");
//                     } else {
//                         message = 'Incorrect password entered';
//                     }
//                 });
//             } else {
//                 message = 'No such email registered';
//             }
//         })
//         .then(function() {
//             console.log("bye");
//             alertMessage(res, 'danger', message, 'fas fa-exclamation-circle', false);
//             res.render('user/login');
//             });
// });

// router.post('/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     var error;
//     var message;

//     User.findOne({
//         where: {
//             email
//         }
//     }).then(function (user) {
//         if (user) {
//             bcrypt.compare(password, user.password, function (err, res) {
//                 if (res == true) {
//                     message = "It works yaaaaaay";
//                 } else {
//                     error = 'Incorrect password entered';
//                 }
//             });
//         } else {
//             error = 'No such email registered';
//         }
//     }).then(function () {
//         if (error !== undefined) {
//             alertMessage(res, 'danger', error, 'fas fa-exclamation-circle', false);
//         } else if (message !== undefined) {
//             alertMessage(res, 'success', message, 'fas fa-exclamation-circle', true);
//         }
//         res.render('user/login');
//     });
// });

module.exports = router;