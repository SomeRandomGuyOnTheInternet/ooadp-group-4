const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const Question = db.define('Question', {
    question: {
        type: Sequelize.STRING
    },
    answer: {
        type: Sequelize.STRING
    },
    suggestion: {
        type: Sequelize.STRING, 
    },

    isAnswered: { 
        type: Sequelize.BOOLEAN, 
    },
});

module.exports = Question;
