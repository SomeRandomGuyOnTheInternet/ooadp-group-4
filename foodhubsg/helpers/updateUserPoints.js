const Sequelize = require('sequelize');

const User = require('../models/User');
const UserAction = require('../models/UserAction');
const UserBadge = require('../models/UserBadge');


var startDt = new Date();
var endDt = new Date(startDt);
endDt.setMinutes(startDt.getMinutes() - 5);

function updateUserPoints(user, points, source, additionalMessage = "") {
    if (!user.isBanned) {
        var type = "positive", pointsAction = "gained";
        
        if (points < 0) {
            type = "negative";
            pointsAction = "lost";
        }

        User.update(
            { gainedPoints: Sequelize.literal(`gainedPoints + ${points}`) },
            { 
                where: { id: user.id },
                returning: true,
                plain: true,
            }
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
                Promise.all([
                    User.findOne({ where: { id: user.id } }),
                    UserAction.findAll({
                        where: {
                            action: { [Sequelize.Op.like]: '%' + "points" + '%' },
                            UserId: user.id,
                            createdAt: { [Sequelize.Op.between]: [endDt, startDt] }
                        },
                        raw: true
                    }),
                ])
                .then((data) => {
                    console.log(data[1], data[1].length)
                    if (data[1].length >= 10) {
                        
                        User.update(
                            { isBanned: true },
                            { where: { id: user.id } }
                        )
                        .then(() => {
                            UserAction.create({
                                UserId: user.id,
                                action: "been banned from earning points",
                                source: "getting too many points in a short timespan",
                                type: "negative",
                                additionalMessage: "If you have any enquiries, please contact us at admin@foodhubsg.com",
                                hasViewed: false
                            })
                            .then(() => {});
                        });
                    };

                    if (data[0].gainedPoints >= 1000) {
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
                                .then(() => {});
                            };
                        });
                    };
                });
            });
        });
    }
};


module.exports = updateUserPoints;