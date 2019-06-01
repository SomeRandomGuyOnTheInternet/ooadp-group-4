const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const Question = db.define('Question', {
    questions: {
        type: Sequelize.STRING
    },
    answers: {
        type: Sequelize.STRING
    },
    suggestions: {
        type: Sequelize.STRING, 
    },

    isAnswered: { 
        type: Sequelize.BOOLEAN, 
    }
});

module.exports = Question;