const Referral = require('../models/Referral');

const updateUserPoints = require('../helpers/updateUserPoints');
const addBadges = require('../helpers/addBadges');


async function createUserReferral(user, referredUser, isMutual = true, additionalMessage = null, callToAction = null, callToActionLink = null) {
    await
        Referral.create({
            UserId: user.id,
            RefUserCode: referredUser.refCode,
            RefUserId: referredUser.id,
            isMutual,
        });

    await
        Referral.update(
            { isMutual },
            { where: { UserId: referredUser.id, RefUserId: user.id } }
        );

    updateUserPoints(user, 75, "adding a friend to your profile", additionalMessage);
    updateUserPoints(referredUser, 25, `${user.name} adding you to their friend group through your referral code`, null, callToAction, callToActionLink);

    let userReferrals = await Referral.findAll({ where: { UserId: user.id } });

    if (userReferrals.length >= 1) { addBadges('First Friend', user, "adding your first referral"); }
    else if (userReferrals.length >= 10) { addBadges('Full House', user, "adding ten referrals"); }
};


module.exports = createUserReferral;