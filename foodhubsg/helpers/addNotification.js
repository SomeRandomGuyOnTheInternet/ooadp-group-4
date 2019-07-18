const Notification = require('../models/UserAction');


function addNotification(user, item, action, source, type, imageLocation = null) {
    var hasViewed = true;

    Notification.create({ 
        UserId: user.id, 
        item: "100 points",
        action: "gained", 
        source: "ading a recommended food item", 
        type: "positive"
    })
};


module.exports = addNotification;