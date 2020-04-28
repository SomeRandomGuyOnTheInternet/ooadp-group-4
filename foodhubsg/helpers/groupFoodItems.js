let _ = require('lodash');
const moment = require('moment'); 

function groupFoodItems(ungroupedFoodItems, setDates = false) {
    let datesWithFood;
    let userFoodLog = _.groupBy(ungroupedFoodItems, 'FoodLogs.UserId');

    for (let [userId, foodLog] of Object.entries(userFoodLog)) {
        datesWithFood = _.groupBy(foodLog, 'FoodLogs.createdAtDate');

        for (let [date, dateFood] of Object.entries(datesWithFood)) {
            for (i = 0, breakfastCalories = 0, lunchCalories = 0, dinnerCalories = 0, snacksCalories = 0, dailyCalories = 0; i < dateFood.length; i++) {
                switch (dateFood[i]["FoodLogs.mealType"]) {
                    case "Breakfast":
                        breakfastCalories += parseInt(dateFood[i].calories);
                        break;

                    case "Lunch":
                        lunchCalories += parseInt(dateFood[i].calories);
                        break;

                    case "Dinner":
                        dinnerCalories += parseInt(dateFood[i].calories);
                        break;

                    case "Snacks":
                        snacksCalories += parseInt(dateFood[i].calories);
                        break;
                }
                dailyCalories += parseInt(dateFood[i].calories);
                if (setDates == true) { dateFood[i]["FoodLogs.createdAt"] = moment(dateFood[i]["FoodLogs.createdAt"]).format("h:mm a"); }
            }
            datesWithFood[date] = _.groupBy(dateFood, 'FoodLogs.mealType');
            datesWithFood[date].breakfastCalories = breakfastCalories;
            datesWithFood[date].lunchCalories = lunchCalories;
            datesWithFood[date].dinnerCalories = dinnerCalories;
            datesWithFood[date].snacksCalories = snacksCalories;
            datesWithFood[date].dailyCalories = dailyCalories;
        }
        userFoodLog[userId] = datesWithFood;
    }

    return userFoodLog;
};

module.exports = groupFoodItems;