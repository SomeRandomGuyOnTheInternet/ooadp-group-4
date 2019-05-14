const loggedOut = (req, res, next) => {
    if (req.user) {
        res.redirect('/user/');
    } else {
        next();
    }
};

module.exports = loggedOut;