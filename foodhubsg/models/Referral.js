const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const Referral = db.define('Referral', {
    RefUserCode: {
        type: Sequelize.STRING
    },
    compliment: { 
        type: Sequelize.STRING(2000)
    }, 
});



module.exports = Referral;