const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const FoodLog = db.define('FoodLog', {
});

module.exports = FoodLog;