const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');


function localStrategy(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
        User.findOne({ where: { email: email.toLowerCase() }
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'Please enter a valid email address' });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        var location = req.body.location; 
                        var latitude = req.body.latitude, longitude = req.body.longitude;
                        User.update(
                            { location, latitude, longitude },
                            { where: { email: email.toLowerCase() } },
                        );
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Please enter the correct password' })
                    }
                })
            })
        }));

    // Serializes (stores) user id into session upon successful authentication
    passport.serializeUser((user, done) => { done(null, user.id); });// user.id is used to identify authenticated user 

    // User object is retrieved by userId from session and put into req.user
    passport.deserializeUser((userId, done) => {
        User.findOne({ where: { id: userId }})
            .then((user) => {
                done(null, user); // user object saved in req.session
            })
            .catch((done) => { // No user found, not stored in req.session
                console.log(done);
            });
    });
}


module.exports = { localStrategy };