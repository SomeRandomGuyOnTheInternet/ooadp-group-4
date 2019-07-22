function checkFriends(referrals) { 
    let count = 0;
    for (i = 0; i < referrals.length; i ++) { 
        count += 1; 
    }

    if (count > 0) { 
        addBadges('First Friend'); 
        break; 
    }

    else if (count > 5) { 
        addBadges('Five Friends'); 
        break; 
    }
    
    else if (count > 10) { 
        addBadges('Ten Friends'); 
        break; 
    }
}; 