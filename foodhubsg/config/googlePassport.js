const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

function googleStrategy(passport) {
    passport.use(new GoogleStrategy({
        clientID: "643119877028-3qm7kb0mljs8n6hehpq9dqsfa6u86qlu.apps.googleusercontent.com",
        clientSecret: "ZseOl2rjZzxP2QVixnOyoju5",
        callbackURL: "/google/callback", 
    },

    function(accessToken, refreshToken, profile, done) {
        User.findOne({
            where: { email: profile.emails[0].value }
        })
        .then(user => {
            if (!user) {
                User.create({
                    name: profile.name.givenName, 
                    email: profile.emails[0].value,
                    weight: 0,
                    height: 0,
                })
                .then(user => done(null, user));
            } else {
                done(null, user);
            }
        });
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

module.exports = { googleStrategy };