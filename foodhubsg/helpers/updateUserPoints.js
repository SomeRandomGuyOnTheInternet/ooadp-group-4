const Sequelize = require('sequelize');

const User = require('../models/User');
const UserAction = require('../models/UserAction');
const UserBadge = require('../models/UserBadge');


function updateUserPoints(user, points, source, additionalMessage = "") {
    var type = "positive", pointsAction = "gained";
    
    if (points < 0) {
        type = "negative";
        pointsAction = "lost";
    }

    User.update(
        { gainedPoints: Sequelize.literal(`gainedPoints + ${points}`) },
        { where: { id: user.id } }
    )
    .then(() => {
        UserAction.create({
            UserId: user.id,
            action: `${pointsAction} ${Math.abs(points)} points`,
            source,
            type,
            additionalMessage,
            hasViewed: false
        })
        .then(() => {
            if (user.gainedPoints >= 1000) {
                UserBadge.findAll({
                    where: { UserId: user.id, BadgeId: 3 },
                    raw: true
                })
                .then((existingBadge) => {
                    if (!existingBadge.length) {
                        Promise.all([
                            UserAction.create({
                                UserId: user.id,
                                action: "earned the High Roller badge",
                                source: "obtaining more than 1000 points",
                                type: "positive",
                                additionalMessage: "",
                                hasViewed: false
                            }),
                            UserBadge.create({
                                UserId: user.id,
                                BadgeId: 3,
                            }),
                        ])
                    }
                });
            }
        });
    });
};


module.exports = updateUserPoints;