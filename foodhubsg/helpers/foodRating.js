@ -0,0 +1,31 @@
var ratings;

function getFoodRatings(food) {
    if (food <= 400) {
        ratings = 5;

    }
    else if (food <= 500) {
        ratings = 4;

    }

    else if (food <= 600) {
        ratings = 3;

    }

    else if (food <= 700) {
        ratings = 2;

    }

    else {
        ratings = 1;

    }
    return ratings;
}


module.exports = getFoodRatings;