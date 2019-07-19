const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const Badge = db.define('Badge', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    imageLocation: {
        type: Sequelize.STRING, 
    },
    
});



module.exports = Badge;
