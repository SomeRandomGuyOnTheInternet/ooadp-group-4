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
            const name = profile.name.givenName;
            const email = profile.emails[0].value;
            const isAdmin = isBanned = isVendor = false;

            if (!user) {
                User.create({ name, email, isAdmin, isBanned, isVendor })
                .then(user => done(null, user));
            } else {
                done(null, user);
            }
        });
    }));

    passport.serializeUser((user, done) => { done(null, user.id); });

    passport.deserializeUser((userId, done) => {
        User.findOne({ where: { id: userId }})
        .then((user) => {
            done(null, user);
        })
        .catch((done) => {
            console.log(done);
        });
    });
}

module.exports = { googleStrategy };