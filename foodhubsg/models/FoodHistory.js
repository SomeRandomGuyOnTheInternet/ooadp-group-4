const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const FoodHistory = db.define('foodHistory', {
    timeAdded: {
        type: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

module.exports = FoodHistory;