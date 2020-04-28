const addBadges = require('./addBadges');

function checkUserActivity(user) { 
    if (user.daysActive == 7 && user.averageCalories <= 2500) { 
        addBadges('A Week of Health', user, "Been with us for 7 days"); 
    }
}

module.exports = checkUserActivity; 