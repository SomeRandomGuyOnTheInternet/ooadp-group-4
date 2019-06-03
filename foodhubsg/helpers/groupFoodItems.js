var _ = require('lodash');
const moment = require('moment'); 

function groupFoodItems(foodItems, setDates = false) {
    datesWithFood = _.groupBy(foodItems, 'FoodLogs.createdAtDate');

    for (var [key, value] of Object.entries(datesWithFood)) {
        for (i = 0, dailyCalories = 0; i < value.length; i++) {
            dailyCalories += parseInt(value[i].calories);

            if (setDates == true){ value[i]["FoodLogs.createdAt"] = moment(value[i]["FoodLogs.createdAt"]).format("h:mm a"); }
        }
        datesWithFood[key] = _.groupBy(value, 'FoodLogs.mealType');
        datesWithFood[key].dailyCalories = dailyCalories;
    }

    return datesWithFood;
};

module.exports = groupFoodItems;