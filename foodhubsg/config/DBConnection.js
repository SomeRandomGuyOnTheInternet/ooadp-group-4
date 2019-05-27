const mySQLDB = require('./DBConfig');
const createInstance = require('./DBInstance');
const User = require('../models/User');
const Food = require('../models/Food');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');


// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('FoodHubSG database is now connected!');
        })
        .then(() => {
            User.hasMany(FoodLog);
            Food.hasMany(FoodLog);
            Shop.hasMany(Food, {});

            mySQLDB.sync({ // Creates table if none exists
                force: drop
            }).then(() => {
                console.log('Create tables if none exists');
                if (drop == true) { createInstance(Shop, Food); }
            }).catch(err => console.log(err))
        })
        .catch(err => console.log('Error: ' + err));
};

module.exports = {
    setUpDB
};