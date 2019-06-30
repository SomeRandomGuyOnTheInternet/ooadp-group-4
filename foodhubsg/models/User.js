const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const User = db.define('User', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    height: {
        type: Sequelize.FLOAT
    }, 
    weight: {
        type: Sequelize.FLOAT
    },
    weight: {
        type: Sequelize.FLOAT
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
    
}); module.exports = User;