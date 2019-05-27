function createInstance(Shop, Food, User) {
    Shop.bulkCreate([
        { 
            name: 'Misaka', 
            address: '1 Sengkang Square #01-225, Sengkang - 545078', 
            location: 'Sengkang', 
            rating: 4.3, 
            description: 'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients', 
            imageLocation: '/images/misaka-sengkang-image.jpeg', 
            isDeleted: false,
            isRecommended: true,
        },
        {
            name: 'The Bistro',
            address: '1 Sengkang Square #02-336, Sengkang - 545078',
            location: 'Sengkang', 
            rating: 2.9,
            description: 'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients',
            imageLocation: '/images/thebistro-sengkang-image.jpeg',
            isDeleted: false,
            isRecommended: false,
        },
        {
            name: 'Grains',
            address: '26 Ang Mo Kio Industrial Park 2 #01-00, AMK - 569507',
            location: 'Ang Mo Kio',
            rating: 4.8,
            description: 'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.',
            imageLocation: '/images/grains-amk-image.jpg',
            isDeleted: false,
            isRecommended: true,
        },
        {
            name: 'Lean Bento',
            address: '36 Ang Mo Kio Hub #02-36, AMK - 569507',
            location: 'Ang Mo Kio',
            rating: 4.3,
            description: 'The blatantly correct choice.',
            imageLocation: '/images/leanbento-amk-image.jpeg',
            isDeleted: false,
            isRecommended: true,
        },
        {
            name: 'The Lawn',
            address: '26 Ang Mo Kio Industrial Park 2 #03-97, AMK - 569507',
            location: 'Ang Mo Kio',
            rating: 3.8,
            description: 'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.',
            imageLocation: '/images/thelawn-amk-image.jpeg',
            isDeleted: false,
            isRecommended: false,
        },
        {
            name: 'The Warm Drum',
            address: '26 Ang Mo Kio Industrial Park 2 #01-38, AMK - 569507',
            location: 'Ang Mo Kio',
            rating: 2.5,
            description: 'Fresh meat cuts are available.',
            imageLocation: '/images/warmdrum-amk-image.jpeg',
            isDeleted: false,
            isRecommended: false,
        },
        { name: 'Fried Rice Stall', address: '456 Fuckbum ASU', location: 'Punggol', rating: 2.67, description: 'idkman pt.2', imageLocation: '/images/leanbento-amk-image.jpeg', isDeleted: false, },
    ]);

    Food.bulkCreate([
        { name: 'Aglio Olio', calories: 571, shopId: 1, isRecommended: false, },
        { name: 'Cesear Salad', calories: 346, shopId: 1, isRecommended: true, },
        { name: 'Cream of Mushroom Soup', calories: 827, shopId: 1, isRecommended: false, },
        { name: 'Carbonara', calories: 436, shopId: 1, isRecommended: true, },
        { name: 'Mushroom Pasta', calories: 682, shopId: 1, isRecommended: false, },
        { name: 'Teriyaki Bento', calories: 682, shopId: 2, isRecommended: false, },
    ]);

};

module.exports = createInstance;