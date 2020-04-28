const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const Question = db.define('question', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING(1000)
    },  
    suggestion: {
        type: Sequelize.STRING(1000)
    },
    isAnswered: { 
        type: Sequelize.BOOLEAN
    },
    isAdmin: { 
        type: Sequelize.BOOLEAN
    },
});



module.exports = Question;
