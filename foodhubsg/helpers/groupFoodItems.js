var _ = require('lodash');
const moment = require('moment'); 

function groupFoodItems(foodItems, setDates = false) {
    
    datesWithFood = _.groupBy(foodItems, 'FoodLogs.createdAtDate');

    for (var [key, value] of Object.entries(datesWithFood)) {
        for (i = 0, breakfastCalories = 0, lunchCalories = 0, dinnerCalories = 0, snacksCalories = 0, dailyCalories = 0; i < value.length; i++) {
            switch (value[i]["FoodLogs.mealType"])  {
                case "Breakfast":
                    breakfastCalories += parseInt(value[i].calories);
                    break;

                case "Lunch":
                    lunchCalories += parseInt(value[i].calories);
                    break;

                case "Dinner":
                    dinnerCalories += parseInt(value[i].calories);
                    break;

                case "Snacks":
                    snacksCalories += parseInt(value[i].calories);
                    break;
            }
            dailyCalories += parseInt(value[i].calories);
            if (setDates == true){ value[i]["FoodLogs.createdAt"] = moment(value[i]["FoodLogs.createdAt"]).format("h:mm a"); }
        }
        datesWithFood[key] = _.groupBy(value, 'FoodLogs.mealType');
        datesWithFood[key].breakfastCalories = breakfastCalories;
        datesWithFood[key].lunchCalories = lunchCalories;
        datesWithFood[key].dinnerCalories = dinnerCalories;
        datesWithFood[key].snacksCalories = snacksCalories;
        datesWithFood[key].dailyCalories = dailyCalories;
    }

    return datesWithFood;
};

module.exports = groupFoodItems;