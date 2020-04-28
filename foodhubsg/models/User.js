const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const User = db.define('User', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    latitude: {
        type: Sequelize.DECIMAL(10, 7)
    },
    longitude: {
        type: Sequelize.DECIMAL(10, 7)
    },
    isDeleted: {
        type: Sequelize.BOOLEAN
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
    isVendor: {
        type: Sequelize.BOOLEAN
    },
    isBanned: {
        type: Sequelize.BOOLEAN
    },
    password: {
        type: Sequelize.STRING
    },
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
    daysActive: {
        type: Sequelize.FLOAT
    },
}); 



module.exports = User;