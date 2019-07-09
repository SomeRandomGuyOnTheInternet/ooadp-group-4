const User = require('../models/User');



function getReferredUsers(userReferrals) {
    var referredUsers = [];

    for (i = 0; i < userReferrals.length; i++) {
        User.findOne({ where: { id: userReferrals[i].RefUserId }, raw: true })
        .then((referredUser) => {
            referredUsers.push(referredUser);       
        });
    }
    
    return referredUsers;
};



module.exports = getReferredUsers;