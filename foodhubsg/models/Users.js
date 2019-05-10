const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const Users = db.define('users', {
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
    
}); module.exports = Users;