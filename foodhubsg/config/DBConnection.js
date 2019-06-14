const mySQLDB = require('./DBConfig');
const createInstance = require('./DBInstance');

const User = require('../models/User');
const FoodItem = require('../models/FoodItem');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');
const Question = require('../models/Question'); 

// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('FoodHubSG database is now connected!');
        })
        .then(() => {
            User.hasMany(FoodLog);
            FoodItem.hasMany(FoodLog, { foreignKey: 'FoodId' });
            FoodLog.belongsTo(FoodItem, { foreignKey: 'FoodId' });

            Shop.hasMany(FoodItem, { foreignKey: 'ShopId' });
            FoodItem.belongsTo(Shop, { foreignKey: 'ShopId' });

            User.hasMany(Shop, { foreignKey: 'VendorId' }); 
            Shop.belongsTo(User, { foreignKey: 'VendorId' });

            User.hasMany(Question, { foreignKey: 'UserId' }); 
            mySQLDB.sync({ // Creates table if none exists
                force: drop
            })
            .then(() => {
                console.log('Create tables if none exists');
                if (drop == true) { createInstance(Shop, FoodItem, User); }
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log('Error: ' + err));
};

module.exports = {
    setUpDB
};