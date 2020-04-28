const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const FoodLog = db.define('FoodLog', {
    mealType: {
        type: Sequelize.STRING
    },
    createdAtDate: {
        type: Sequelize.DATEONLY,
    }
});

module.exports = FoodLog;