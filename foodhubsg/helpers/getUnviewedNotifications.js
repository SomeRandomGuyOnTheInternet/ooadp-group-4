const Notification = require('../models/UserAction');


async function getUnviewedNotifications(user) {
    let hasViewed = true;

    return Notification.findAll({ where: { hasViewed: false, UserId: user.id } })
    .then((unviewedNotifications) => {
        Notification.update(
            { hasViewed },
            { where: { hasViewed: false, UserId: user.id } },
            { raw: true }
        );

        return unviewedNotifications;

    });
};


module.exports = getUnviewedNotifications;