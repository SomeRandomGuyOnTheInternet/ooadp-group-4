var _ = require('lodash');

function groupFoodItems(foodItems) {
    datesWithFood = _.groupBy(foodItems, 'FoodLogs.createdAtDate');
    for (var [key, value] of Object.entries(datesWithFood)) {
        datesWithFood[key] = _.groupBy(value, 'FoodLogs.mealType');
    }

    return datesWithFood;
};

module.exports = groupFoodItems;