const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const UserAction = require('../models/UserAction'); 


async function addBadges(name, user, source) {
    let badge = await Badge.findOne({ where: { name } });
    let existingBadge = await
        UserBadge.findAll({
            where: {
                UserId: user.id,
                BadgeId: badge.id
            }
        });

    if (!existingBadge.length) {
        await
            UserBadge.create({
                UserId: user.id,
                BadgeId: badge.id
            });

        await
            UserAction.create({
                UserId: user.id,
                action: `earned the ${badge.name} badge`,
                source,
                type: "positive",
                additionalMessage: "You can view this badge on your page.",
                hasViewed: false
            });
    };
};


module.exports = addBadges; 