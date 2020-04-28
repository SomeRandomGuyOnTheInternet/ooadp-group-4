const getShopRatings = require('./getShopRating');

const Shop = require('../models/Shop');
const FoodItem = require('../models/FoodItem')


async function updateShopRating(ShopId) {
    let rating = null, isRecommended = null;
    let isDeleted = false;

    let foodItems = await FoodItem.findAll({ where: { ShopId, isDeleted } });

    if (foodItems.length) {
        rating = getShopRatings(foodItems);
        isRecommended = (rating >= 3) ? true : false;
    };

    await
        Shop.update(
            {
                rating,
                isRecommended,
            },
            { where: { id: ShopId } }
        );
};


module.exports = updateShopRating;