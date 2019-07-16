const Sequelize = require('sequelize');

const User = require('../models/User');
const FoodLog = require('../models/FoodLog');
const Food = require('../models/FoodItem');

const groupFoodItems = require('./groupFoodItems');
const getAverageCalories = require('./getAverageCalories');


function updateUserInfo(user, newGainedPoints = 0) {
    Food.findAll({
        include: [{
            model: FoodLog,
            where: { UserId: user.id },
            required: true,
        }],
        raw: true
    })
    .then((foodItems) => {
        var groupedFoodItems = groupFoodItems(foodItems);

        User.update(
            {
                averageCalories: getAverageCalories(groupedFoodItems[user.id]),
                averageBreakfastCalories: getAverageCalories(groupedFoodItems[user.id], "breakfastCalories"),
                averageLunchCalories: getAverageCalories(groupedFoodItems[user.id], "lunchCalories"),
                averageDinnerCalories: getAverageCalories(groupedFoodItems[user.id], "dinnerCalories"),
                averageSnacksCalories: getAverageCalories(groupedFoodItems[user.id], "snacksCalories"),
                daysActive: Object.keys(groupedFoodItems[user.id]).length,
                gainedPoints: Sequelize.literal(`gainedPoints + ${newGainedPoints}`),
            },
            { where: { id: user.id } }
        );
    });
};


module.exports = updateUserInfo;