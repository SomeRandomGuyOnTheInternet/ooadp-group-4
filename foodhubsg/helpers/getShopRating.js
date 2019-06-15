function getShopRating(foodItems) {
    var rating = 0, averageCalories = 0;

    for (i = 0, totalCalories = 0; i < foodItems.length; i++) {
        totalCalories += Number(foodItems[i].calories);
    }

    averageCalories = (totalCalories / foodItems.length);

    if (averageCalories > 800) { rating = 1 } 
    else if (700 < averageCalories && averageCalories < 799) { rating = 2 } 
    else if (600 < averageCalories && averageCalories < 699) { rating = 3 } 
    else if (500 < averageCalories && averageCalories < 599) { rating = 4 } 
    else { rating = 5 }

    return rating;
};

module.exports = getShopRating;