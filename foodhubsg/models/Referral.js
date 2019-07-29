const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const Referral = db.define('Referral', {
    RefUserCode: {
        type: Sequelize.STRING
    },
    isMutual: {
        type: Sequelize.BOOLEAN
    },
});



module.exports = Referral;