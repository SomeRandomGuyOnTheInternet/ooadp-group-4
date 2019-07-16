const User = require('../models/User');
const UserAction = require('../models/UserAction');


function addUserPoints(user, points, source, additionalMessage) {
    return Promise.all([
        User.update(
            { gainedPoints: Sequelize.literal(`gainedPoints + ${points}`) },
            { where: { id: user.id } }
        ),
        UserAction.create({
            UserId: req.user.id,
            action: `gained ${points} points`,
            source,
            type: "positive",
            additionalMessage,
            hasViewed: false
        }),
    ])
    .then(() => { return });
};


module.exports = addUserPoints;