const Sequelize = require('sequelize');

const User = require('../models/User');
const UserAction = require('../models/UserAction');
const UserBadge = require('../models/UserBadge');


async function updateUserPoints(user, points, source, additionalMessage = "", callToAction = null, callToActionLink = null) {
    var startDt = new Date();
    var endDt = new Date(startDt);
    endDt.setMinutes(startDt.getMinutes() - 5);

    if (!user.isBanned) {
        var type = "positive", pointsAction = "gained";
        
        if (points < 0) {
            type = "negative";
            pointsAction = "lost";
        };

        await
            User.update(
                { gainedPoints: Sequelize.literal(`gainedPoints + ${points}`) },
                { 
                    where: { id: user.id },
                    returning: true,
                    plain: true,
                }
            );
        
        await
            UserAction.create({
                UserId: user.id,
                action: `${pointsAction} ${Math.abs(points)} points`,
                source,
                type,
                additionalMessage,
                hasViewed: false,
                callToAction,
                callToActionLink,
            });

        let updatedUser = await User.findOne({ where: { id: user.id } });  
        let recentPointAdditions = await
            UserAction.findAll({
                where: {
                    action: { [Sequelize.Op.like]: '%' + "points" + '%' },
                    UserId: user.id,
                    createdAt: { [Sequelize.Op.between]: [endDt, startDt] }
                },
                raw: true
            });

        if (recentPointAdditions.length >= 10) {
            await
                User.update(
                    { isBanned: true },
                    { where: { id: user.id } }
                );
            
            await
                UserAction.create({
                    UserId: user.id,
                    action: "been banned from earning points",
                    source: "getting too many points in a short timespan",
                    type: "negative",
                    additionalMessage: "If you have any enquiries, please contact us at admin@foodhubsg.com.",
                    hasViewed: false
                });
        };

        if (updatedUser.gainedPoints >= 1000) {
            let existingBadge = await UserBadge.findOne({ where: { UserId: user.id, BadgeId: 3 } });
            
            if (!existingBadge) {
                await
                    UserAction.create({
                        UserId: user.id,
                        action: "earned the High Roller badge",
                        source: "obtaining more than 1000 points",
                        type: "positive",
                        additionalMessage: "",
                        hasViewed: false
                    });

                await
                    UserBadge.create({
                        UserId: user.id,
                        BadgeId: 3,
                    });
            };
        };
    };
};


module.exports = updateUserPoints;