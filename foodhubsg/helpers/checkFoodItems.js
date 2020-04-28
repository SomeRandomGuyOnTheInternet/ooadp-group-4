const addBadges = require('./addBadges'); 

function checkFoodItems(foodItems, user) { 
    let count = foodItems.length; 

    if (count > 0) { 
        addBadges('Baby Steps', user, "First step to health"); 
    }
    
    else if (count > 10) { 
        addBadges('On Your Way Up', user, "You have gone a long way"); 
    }
}

module.exports = checkFoodItems; 