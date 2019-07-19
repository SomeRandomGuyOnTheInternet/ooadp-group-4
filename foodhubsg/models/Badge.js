const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Badge = db.define('Badge', { 
    name: {
        type: Sequelize.STRING
    },
    isDeleted: { 
        type: Sequelize.BOOLEAN
    }, 
    imageLocation: { 
        type: Sequelize.STRING, 
    }
})

module.exports = Badge; 