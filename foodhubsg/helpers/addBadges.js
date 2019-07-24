const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const UserAction = require('../models/UserAction'); 


function addBadges(name, user, source) {
    Badge.findOne({ where: { name } })
    .then((badge) => {
        UserBadge.findAll({
            where: {
                UserId: user.id,
                BadgeId: badge.id
            }
        })
        .then((existingBadge) => {
            if (!existingBadge.length) {
                Promise.all([
                    UserBadge.create({
                        UserId: user.id,
                        BadgeId: badge.id
                    }),
                    UserAction.create({
                        UserId: user.id,
                        action: `earned the ${badge.name} badge`,
                        source,
                        type: "positive",
                        additionalMessage: "You can view this badge on your page.",
                        hasViewed: false
                    }),
                ])
                .then(setTimeout(function (data) { }, 2500));
            }
        })
    })
}


module.exports = addBadges; 