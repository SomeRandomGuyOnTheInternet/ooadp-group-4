function groupReferredUsers(referredUsers, badges) {
    for (i = 0; i < referredUsers.length; i++) {
        referredUsers[i]["badges"] = [];

        for (j = 0; j < badges.length; j++) {
            if (referredUsers[i].id == badges[j].UserId) referredUsers[i]["badges"].push(badges[j]);
        }
    }

    return referredUsers;
};

module.exports = groupReferredUsers;