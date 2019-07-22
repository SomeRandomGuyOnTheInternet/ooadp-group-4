const addBadges = require('./addBadges'); 

function checkFoodItems(foodItems, user) { 
    let count = foodItems.length; 

    if (count > 0) { 
        addBadges('Baby Steps', user); 
    }
    
    else if (count > 10) { 
        addBadges('On Your Way Up', user); 
    }
}

module.exports = checkFoodItems; 