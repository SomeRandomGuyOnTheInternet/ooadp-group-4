var _ = require('lodash');

function groupFoodItems(foodItems) {
    datesWithFood = _.groupBy(foodItems, 'FoodLogs.createdAtDate');
    for (var [key, value] of Object.entries(datesWithFood)) {
        for (i = 0, dailyCalories = 0; i < value.length; i++) {
            dailyCalories += parseInt(value[i].calories);
        }
        datesWithFood[key] = _.groupBy(value, 'FoodLogs.mealType');
        datesWithFood[key].dailyCalories = dailyCalories;
    }

    return datesWithFood;
};

module.exports = groupFoodItems;