const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const FoodLog = db.define('FoodLog', {
    mealType: {
        type: Sequelize.STRING
    },
});

module.exports = FoodLog;