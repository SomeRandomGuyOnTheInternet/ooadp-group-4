const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const Food = db.define('Food', {
    name: {
        type: Sequelize.STRING
    },
    calories: {
        type: Sequelize.STRING
    },
    isRecommended: {
        type: Sequelize.BOOLEAN
    },

    images: { 
        type: Sequelize.STRING, 
    }
});

module.exports = Food;