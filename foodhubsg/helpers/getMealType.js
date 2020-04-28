function getMealType() {
    let today = new Date();

    if (today.getHours() >= 6 && today.getHours() <= 9) {
        mealType = "Breakfast";
    } else if (today.getHours() >= 12 && today.getHours() <= 14) {
        mealType = "Lunch";
    } else if (today.getHours() >= 18 && today.getHours() <= 21) {
        mealType = "Dinner";
    } else {
        mealType = "Snacks";
    };

    return mealType;
};

module.exports = getMealType;