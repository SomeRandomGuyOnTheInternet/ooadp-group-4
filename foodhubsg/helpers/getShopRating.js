function getShopRating(foodItems) {
    var rating = 0, averageCalories = 0;

    for (i = 0, totalCalories = 0; i < foodItems.length; i++) {
        totalCalories += Number(foodItems[i].calories);
    }

    averageCalories = (totalCalories / foodItems.length);
    console.log(averageCalories)
    
    if (averageCalories > 800) { rating = 1 } 
    else if (averageCalories > 700) { rating = 2 } 
    else if (averageCalories > 600) { rating = 3 } 
    else if (averageCalories > 500) { rating = 4 } 
    else if (averageCalories > 400) { rating = 5 } 
    else { rating = 1 }

    return rating;
};

module.exports = getShopRating;