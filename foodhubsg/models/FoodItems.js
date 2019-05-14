const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const FoodItems = db.define('foodItems', {
    name: {
        type: Sequelize.STRING
    },
    calories: {
        type: Sequelize.STRING
    },
    isRecommended: {
        type: Sequelize.BOOLEAN
    },
});

module.exports = FoodItems;