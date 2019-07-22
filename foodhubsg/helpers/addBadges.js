const Badge = require('../models/Badge'); 
const UserBadge = require('../models/UserBadge');

function addBadges(name) { 
    Badge.findOne({ 
        where : { 
            name : name
        }
    }).then((badge) => { 
        UserBadge.create({ 
            userId: req.user.id, 
            badgeId: badge.id
        })
    })
}