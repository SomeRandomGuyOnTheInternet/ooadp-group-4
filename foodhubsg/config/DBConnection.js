const mySQLDB = require('./DBConfig');
const createInstance = require('./DBInstance');
const users = require('../models/Users');
const foodItems = require('../models/FoodItems');
const shops = require('../models/Shops');


// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('FoodHubSG database is now connected!');
        })
        .then(() => {
            /*
            Defines the relationship where a user has many videos.
            In this case the primary key from user will be a foreign key in video.
            */
            users.hasMany(foodItems, { through: 'foodHistory' });
            foodItems.belongsToMany(users, { through: 'foodHistory' });
            shops.hasMany(foodItems);
            mySQLDB.sync({ // Creates table if none exists
                force: drop
            }).then(() => {
                console.log('Create tables if none exists');
                if (drop == true) { createInstance(shops, foodItems); }
            }).catch(err => console.log(err))
        })
        .catch(err => console.log('Error: ' + err));
};

module.exports = {
    setUpDB
};