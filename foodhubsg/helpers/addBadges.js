const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');

function addBadges(name, user) {
    Badge.findOne({
        where: {
            name: name
        }
    }).then((exName) => {
        UserBadge.findAll({
            where: {
                userId: user.id,
                BadgeId: exName.id
            }
        }).then((exBadge) => {
            if (exBadge.length > 0) {
                break;
            }

            else {
                Badge.findOne({
                    where: {
                        name: name
                    }
                }).then((badge) => {
                    UserBadge.create({
                        userId: user.id,
                        badgeId: badge.id
                    }).then(() => {
                        UserAction.create({
                            UserId: user.id,
                            action: "earned a new badge",
                            source: "done something to be rewarded",
                            type: "positive",
                            additionalMessage: "Congrats, you have a new badge on your page",
                            hasViewed: false
                        })
                            .then(() => { });
                    })
                })
            }
        })
    })


}

module.exports = addBadges; 