const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const FoodItems = db.define('foodItems', {
    name: {
        type: Sequelize.STRING
    },
    calories: {
        type: Sequelize.STRING
    }
});

module.exports = FoodItems;