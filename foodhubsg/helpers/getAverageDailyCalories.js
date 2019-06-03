function getAverageDailyCalories(datesWithFood) {
    var averageDailyCalories = 0, totalCalorieIntake = 0, numOfDays = 0;

    numOfDays = Object.keys(datesWithFood).length;

    if (numOfDays > 0) {
        for (var [key] of Object.entries(datesWithFood)) {
            totalCalorieIntake += parseInt(datesWithFood[key].dailyCalories);
            console.log(totalCalorieIntake);
        }

        averageDailyCalories = totalCalorieIntake / numOfDays;
    }

    return averageDailyCalories;
};

module.exports = getAverageDailyCalories;