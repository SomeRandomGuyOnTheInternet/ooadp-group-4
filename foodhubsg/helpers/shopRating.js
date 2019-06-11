var shopRatings; 
const getRatings = require('./foodRating'); 

function calculateShopRatings(food) { 
    let amount = food.length; 
    for (i=0; i < food.length; i++) { 
        let ratings = getRatings(food);
        shopRatings += ratings; 
    }

    shopRatings = shopRatings/amount
}

module.exports = calculateShopRatings; 