function checkPoints(points, badge) { 

}

function checkFoodItems(foodItems) { 
    let count = 0 
    for (i = 0; i < foodItems.length; i ++) { 
        if (foodItems[i].isReconmended == 1) { 
            count += 1 
        }

        else { 
            continue; 
        }
    }

    if (count > 0) { 
        addBadges('First Food'); 
    }

    else if (count > 5) { 
        addBadges('Five Badges')
    }
    
    else if (count > 10) { 
        addBadges('Ten')
    }
}

function checkFriends(Referrals) { 

}; 

function addBadges(name) { 

}