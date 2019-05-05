function createInstance(Shops, FoodItems) {
    Shops.bulkCreate([
        { name: 'Chicken Rice Stall', address: '123 Bumfuck USA', location: 'Sengkang', rating: 3.5, description: 'idkman', imageLocation: '/images/dailycut-amk-image.jpeg' },
        { name: 'Fried Rice Stall', address: '456 Fuckbum ASU', location: 'Punggol', rating: 2.67, description: 'idkman pt.2', imageLocation: '/images/leanbento-amk-image.jpeg' },
        { name: 'Idk Rice Stall', address: '789 Hell Outer Space', location: 'Yishun', rating: 4.0, description: 'idkman pt. 3 this time it\'s personal', imageLocation: '/images/thelawn-amk-image.jpeg' }
    ]);

    FoodItems.bulkCreate([
        { name: 'Chicken Rice', calories: 571, shopId: 1 },
        { name: 'Fried Rice', calories: 827, shopId: 2 },
        { name: 'Idk Rice', calories: 999, shopId: 3 },
    ]);
}

module.exports = createInstance;