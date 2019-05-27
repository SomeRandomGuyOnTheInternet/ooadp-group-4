const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const Shop = db.define('Shop', {
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.STRING(2000)
    },
    imageLocation: {
        type: Sequelize.STRING
    },
    isDeleted: {
        type: Sequelize.BOOLEAN
    },
    isRecommended: {
        type: Sequelize.BOOLEAN
    },
    vendor: { 
        type: Sequelize.STRING, 
    }, 
});


module.exports = Shop;