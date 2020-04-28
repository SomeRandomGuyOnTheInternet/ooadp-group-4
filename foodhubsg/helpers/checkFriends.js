const addBadges = require('./addBadges');

function checkFriends(referrals, user) { 
    let count = referrals.length; 

    if (count > 0) { 
        addBadges('First Friend', user, "Keeping you on track"); 
    }
    else if (count > 10) { 
        addBadges('Full House', user, "It's so much easier with good friends"); 
    }
}; 

module.exports = checkFriends; 