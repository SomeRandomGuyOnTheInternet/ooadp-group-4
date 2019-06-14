const isUser = (req, res, next) => {
    if (req.user.isVendor || req.user.isAdmin) {
        console.log("YUPIPSRHNPIHSPHNRSPS")
        req.flash('error', "You do not have sufficient permissions to enter that page!");
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = isUser;