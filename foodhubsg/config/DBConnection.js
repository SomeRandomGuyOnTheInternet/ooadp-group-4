const mySQLDB = require('./DBConfig');
const createInstance = require('./DBInstance');

const Badge = require('../models/Badge');
const User = require('../models/User');
const UserAction = require('../models/UserAction');
const UserBadge = require('../models/UserBadge');
const FoodItem = require('../models/FoodItem');
const FoodLog = require('../models/FoodLog');
const Shop = require('../models/Shop');
const Referral = require('../models/Referral');
const Message = require('../models/Message');
const Question = require('../models/Question');

// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
    .then(() => {
        User.hasMany(UserAction, { foreignKey: 'UserId' });
        UserAction.belongsTo(User, { foreignKey: 'UserId' });

        User.hasMany(Message, { foreignKey: 'User1Id' });
        User.hasMany(Message, { foreignKey: 'User2Id' });
        Message.belongsTo(User, { foreignKey: 'User1Id' });
        Message.belongsTo(User, { foreignKey: 'User2Id' });

        Badge.hasMany(UserBadge, { foreignKey: 'BadgeId' });
        User.hasMany(UserBadge, { foreignKey: 'UserId' });
        UserBadge.belongsTo(Badge, { foreignKey: 'BadgeId' });
        UserBadge.belongsTo(User, { foreignKey: 'UserId' });

        User.hasMany(FoodLog, { foreignKey: 'UserId' });
        FoodLog.belongsTo(User, { foreignKey: 'UserId' });

        User.hasMany(Referral, { foreignKey: 'UserId' });
        User.hasMany(Referral, { foreignKey: 'RefUserId' });
        Referral.belongsTo(User, { foreignKey: 'UserId' });
        Referral.belongsTo(User, { foreignKey: 'RefUserId' });
        
        FoodItem.hasMany(FoodLog, { foreignKey: 'FoodId' });
        FoodLog.belongsTo(FoodItem, { foreignKey: 'FoodId' });

        Shop.hasMany(FoodItem, { foreignKey: 'ShopId' });
        FoodItem.belongsTo(Shop, { foreignKey: 'ShopId' });

        User.hasMany(Shop, { foreignKey: 'VendorId' }); 
        Shop.belongsTo(User, { foreignKey: 'VendorId' });

        User.hasMany(Question, { foreignKey: 'UserId' }); 
        Question.belongsTo(User, { foreignKey: 'UserId' })

        mySQLDB.sync({ force: drop })
        .then(() => {
            if (drop == true) createInstance(Badge);
        })
        //.catch(err => console.log(err))
    })
    //.catch(err => console.log('Error: ' + err));
};

module.exports = {
    setUpDB
};
