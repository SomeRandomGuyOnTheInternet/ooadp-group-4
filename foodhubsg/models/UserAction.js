const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const UserAction = db.define('UserAction', {
    action: {
        type: Sequelize.STRING
    },
    source: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    additionalMessage: {
        type: Sequelize.STRING
    },
    imageLocation: {
        type: Sequelize.STRING
    },
    hasViewed: {
        type: Sequelize.BOOLEAN
    }
}); 



module.exports = UserAction;