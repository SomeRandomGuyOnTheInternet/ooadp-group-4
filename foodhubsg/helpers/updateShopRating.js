const getShopRatings = require('./getShopRating');

const Shop = require('../models/Shop');
const FoodItem = require('../models/FoodItem')


function updateShopRating(ShopId) {
    var rating = null, isRecommended = null;
    var isDeleted = false;

    FoodItem.findAll({ where: { ShopId, isDeleted } })
    .then((foodItems) => {
        if (foodItems.length) {
            rating = getShopRatings(foodItems);
            isRecommended = (rating >= 3) ? true : false;
        }

        Shop.update(
            {
                rating,
                isRecommended,
            },
            { where: { id: ShopId } }
        );
    });
};


module.exports = updateShopRating;