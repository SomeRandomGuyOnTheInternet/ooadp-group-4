const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const FoodItem = db.define('FoodItem', {
    name: {
        type: Sequelize.STRING
    },
    calories: {
        type: Sequelize.STRING
    },
    isDeleted: { 
        type: Sequelize.BOOLEAN
    }, 
    isRecommended: {
        type: Sequelize.BOOLEAN
    },
    imageLocation: { 
        type: Sequelize.STRING, 
    }
});

module.exports = FoodItem;