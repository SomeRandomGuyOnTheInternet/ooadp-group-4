const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const Referral = db.define('Referral', {
    friendRefCode: {
        type: Sequelize.STRING
    },
});



module.exports = Referral;