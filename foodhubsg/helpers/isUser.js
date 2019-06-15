const isUser = (req, res, next) => {
    if (req.user) {
        if (req.user.isVendor || req.user.isAdmin) {
            req.flash('error', "You do not have sufficient permissions to enter that page!");
            res.redirect('/');
        } else {
            next();
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = isUser;