function getFoodIntakeStatement(datesWithFood) {
    var foodIntakeStatement;

    numOfDays = Object.keys(datesWithFood).length;

    if (numOfDays > 0) {
        for (var [key] of Object.entries(datesWithFood)) {
            totalCalorieIntake += parseInt(datesWithFood[key].dailyCalories);
            console.log(totalCalorieIntake);
        }

        averageDailyCalories = totalCalorieIntake / numOfDays;
    }

    return foodIntakeStatement;
};

module.exports = getFoodIntakeStatement;