const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const Shops = db.define('shops', {
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
});


module.exports = Shops;