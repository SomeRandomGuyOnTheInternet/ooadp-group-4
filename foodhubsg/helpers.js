module.exports = {
    isLoggedOut: (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    },
    
    isUser: (req, res, next) => {
        if (req.user) {
            if (req.user.isVendor || req.user.isAdmin) {
                req.flash('error', "You do not have sufficient permissions to enter that page!");
                res.redirect('/');
            } else {
                if (!req.user.bmi && req.path != '/') {
                    res.redirect('/user');
                } else {
                    next();
                }
            }
        } else {
            res.redirect('/login');
        }
    },

    isAdmin: (req, res, next) => {
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
    },

    isVendor: (req, res, next) => {
        if (req.user) { 
            if (req.user.isVendor) {
                next();
            } else {
                req.flash('error', "You do not have sufficient permissions to enter that page!");
                res.redirect('/');
            }
        } else {
            res.redirect('/login');
        }
    },


}