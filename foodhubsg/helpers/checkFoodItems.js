const addBadges = require(addBadges); 

function checkFoodItems(foodItems) { 
    let count = 0;
    for (i = 0; i < foodItems.length; i ++) { 
        if (foodItems[i].isReconmended == 1) { 
            count += 1 
        }

        else { 
            continue; 
        }
    }

    if (count > 0) { 
        addBadges('Baby Steps'); 
        break;
    }

    else if (count > 5) { 
        addBadges('Five Times')
        break; 
    }
    
    else if (count > 10) { 
        addBadges('Ten Times')
        break; 
    }
}

module.exports = checkFoodItems; 