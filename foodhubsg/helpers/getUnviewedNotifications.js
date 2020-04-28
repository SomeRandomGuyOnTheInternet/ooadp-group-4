const Notification = require('../models/UserAction');


function getUnviewedNotifications(user) {
    return new Promise(async (resolve, reject) => {
        try {
            let unviewedNotifications = await Notification.findAll({ where: { hasViewed: false, UserId: user.id } });

            await
                Notification.update(
                    { hasViewed: true },
                    { where: { hasViewed: false, UserId: user.id } },
                    { raw: true }
                );

            resolve(unviewedNotifications);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = getUnviewedNotifications;