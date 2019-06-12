var shopRatings;
const getRatings = require('./foodRating');

function calculateShopRatings(rating, items) {
    if (items <= 1) {
        return rating;
    }

    else {
        const total_ratings = rating * (items - 1)
        let newRatings = total_ratings / items
        return newRatings; 
    }

}

module.exports = calculateShopRatings; 