const addBadges = require('./addBadges');

function checkUserActivity(user) { 
    if (user.daysActive == 7 && user.averageCalories <= 2500) { 
        addBadges('A Week of Health'); 
    }
}

module.exports = checkUserActivity; 