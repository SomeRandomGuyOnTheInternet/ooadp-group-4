const isAdmin = (req, res, next) => {
    if (req.user) {
        if (req.user.isAdmin) {
            next();
        } else {
            req.flash('error', "You do not have sufficient permissions to enter that page!");
            res.redirect('/');
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = isAdmin;