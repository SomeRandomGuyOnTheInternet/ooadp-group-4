const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const UserAction = require('../models/UserAction'); 

function addBadges(name, user, source) {
    Badge.findOne({
        where: {
            name: name
        }
    }).then((exName) => {
        UserBadge.findAll({
            where: {
                UserId: user.id,
                BadgeId: exName.id
            }
        }).then((exBadge) => {
            if (exBadge.length > 0) {
                
            }

            else {
                Badge.findOne({
                    where: {
                        name: name
                    }
                }).then((badge) => {
                    UserBadge.create({
                        UserId: user.id,
                        BadgeId: badge.id
                    }).then(() => {
                        UserAction.create({
                            UserId: user.id,
                            action: "earned a new badge",
                            source: source,
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