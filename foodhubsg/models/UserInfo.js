const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const UserInfo = db.define('UserInfo', {
    height: {
        type: Sequelize.FLOAT
    }, 
    weight: {
        type: Sequelize.FLOAT
    },
    bmi: {
        type: Sequelize.FLOAT
    },
    averageCalories: {
        type: Sequelize.FLOAT
    },
    averageBreakfastCalories: {
        type: Sequelize.FLOAT
    },
    averageLunchCalories: {
        type: Sequelize.FLOAT
    },
    averageDinnerCalories: {
        type: Sequelize.FLOAT
    },
    averageSnacksCalories: {
        type: Sequelize.FLOAT
    },
    gainedPoints: {
        type: Sequelize.FLOAT
    },
    refCode: {
        type: Sequelize.STRING
    },   
}); 



module.exports = UserInfo;