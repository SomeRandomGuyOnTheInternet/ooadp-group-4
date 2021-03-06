const Sequelize = require('sequelize');

const User = require('../models/User');
const UserAction = require('../models/UserAction');
const UserBadge = require('../models/UserBadge');

const addBadges = require('../helpers/addBadges');


async function updateUserPoints(user, points, source, additionalMessage = null, callToAction = null, callToActionLink = null) {
    var startDt = new Date();
    var endDt = new Date(startDt);
    endDt.setMinutes(startDt.getMinutes() - 5);

    if (!user.isBanned) {
        let type = (points > 0) ? "positive" : "negative";
        let pointsAction = (points > 0) ? "gained" : "lost";

        await
            User.update(
                { gainedPoints: Sequelize.literal(`gainedPoints + ${points}`) },
                { where: { id: user.id } }
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

        if (recentPointAdditions.length > 5) {
            await
                UserAction.create({
                    UserId: user.id,
                    action: "been detected cheating the points system",
                    source: "getting too many points in a short timespan",
                    type: "negative",
                    additionalMessage: "You will be banned from earning points if you continue cheating.",
                    hasViewed: false
                });
        };

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
            addBadges('High Roller', user, "obtaining more than 1000 points");
        };

        if (updatedUser.gainedPoints >= 10000) {
            addBadges('Baller', user, "obtaining more than 10000 points");
        };
    };
};


module.exports = updateUserPoints;