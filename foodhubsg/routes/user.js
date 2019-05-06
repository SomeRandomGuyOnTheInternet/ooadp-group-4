const express = require('express');
const passport = require('passport');
const router = express.Router();
const Shops = require('../models/Shops');
const User = require('../models/Users');


router.get('/', (req, res) => {
    sequelize.query("SELECT * FROM Shops").then(ShopsRows => {
        console.log(ShopsRows)
    })
    res.render('index', {
        user: req.session.user
    }) // renders views/index.handlebars
});

router.get('/foodJournal', (req, res) => {
    sequelize.query("SELECT * FROM Shops").then(ShopsRows => {
        console.log(ShopsRows)
    })
    res.render('index', {
        user: req.session.user
    }) // renders views/index.handlebars
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