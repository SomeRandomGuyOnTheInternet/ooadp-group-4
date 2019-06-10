var ratings;
var shopRatings;

function getFoodRatings(food) {
        if (food <= 400) {
            ratings = 5;
            shopRatings = shopRatings + ratings;
        }
        else if (food <= 500) {
            ratings = 4;
            shopRatings = shopRatings + ratings;
        }

        else if (food <= 600) {
            ratings = 3;
            shopRatings = shopRatings + ratings;
        }

        else if (food <= 700) {
            ratings = 2;
            shopRatings = shopRatings + ratings;
        }

        else {
            ratings = 1;
            shopRatings = shopRatings + ratings;
        }
        return food = shopRatings; 
}


module.exports = getFoodRatings; 