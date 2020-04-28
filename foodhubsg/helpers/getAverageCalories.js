function getAverageCalories(datesWithFood, mealType = "dailyCalories") {
    let averageCalories = 0, totalCalorieIntake = 0, numOfDays = 0;
    numOfDays = Object.keys(datesWithFood).length;

    if (numOfDays > 0) {
        for (let [key] of Object.entries(datesWithFood)) {
            totalCalorieIntake += parseInt(datesWithFood[key][mealType]);
        }
        averageCalories = totalCalorieIntake / numOfDays;
    }

    return Number(averageCalories).toFixed(2);
};

module.exports = getAverageCalories;