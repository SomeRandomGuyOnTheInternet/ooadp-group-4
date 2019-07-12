const Sequelize = require('sequelize');
const db = require('../config/DBConfig');



const PointsHistory = db.define('PointsHistory', {
    pointsGained: {
        type: Sequelize.INTEGER
    },
    pointsSource: {
        type: Sequelize.STRING
    },
}); 



module.exports = PointsHistory;