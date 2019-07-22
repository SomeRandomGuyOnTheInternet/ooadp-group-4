const addBadges = require('./addBadges');

function checkFriends(referrals, user) { 
    let count = 0;
    for (i = 0; i < referrals.length; i ++) { 
        count += 1; 
    }

    if (count > 0) { 
        addBadges('First Friend', user); 
        break; 
    }
    else if (count > 10) { 
        addBadges('Full House', user); 
        break; 
    }
}; 

module.exports = checkFriends; 