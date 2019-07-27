const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const Message = db.define('Message', {
    Message: {
        type: Sequelize.STRING
    }
});



module.exports = Message;