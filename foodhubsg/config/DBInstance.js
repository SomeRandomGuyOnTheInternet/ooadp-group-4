function createInstance(Shops, FoodItems, Users, Vendors) {
    Shops.bulkCreate([
        { 
            name: 'Misaka', 
            address: '1 Sengkang Square #01-225, Sengkang - 545078', 
            latitude: 1.391430,
            longitude: 103.893420,
            location: 'Sengkang', 
            rating: 4, 
            description: 'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients', 
            imageLocation: '/images/misaka-sengkang-image.jpeg', 
            isDeleted: false,
            isRecommended: true, 
        },
        {
            name: 'The Bistro',
            address: '1 Sengkang Square #02-336, Sengkang - 545078',
            location: 'Sengkang', 
            latitude: 1.391299,
            longitude: 103.893600,
            rating: 3,
            description: 'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients',
            imageLocation: '/images/thebistro-sengkang-image.jpeg',
            isDeleted: false,
            isRecommended: false, 
        },
        {
            name: 'Grains',
            address: '26 Ang Mo Kio Industrial Park 2 #01-00, AMK - 569507',
            location: 'Ang Mo Kio',
            latitude: 1.373938,
            longitude: 103.862897,
            rating: 5,
            description: 'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.',
            imageLocation: '/images/grains-amk-image.jpg',
            isDeleted: false,
            isRecommended: true,
        },
        {
            name: 'Lean Bento',
            address: '36 Ang Mo Kio Hub #02-36, AMK - 569507',
            location: 'Ang Mo Kio',
            latitude: 1.370057,
            longitude: 103.848459,
            rating: 4,
            description: 'The blatantly correct choice.',
            imageLocation: '/images/leanbento-amk-image.jpeg',
            isDeleted: false,
            isRecommended: true,
        },
        {
            name: 'The Lawn',
            address: '26 Ang Mo Kio Industrial Park 2 #03-97, AMK - 569507',
            location: 'Ang Mo Kio',
            latitude: 1.373168,
            longitude: 103.863563,
            rating: 4,
            description: 'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.',
            imageLocation: '/images/thelawn-amk-image.jpeg',
            isDeleted: false,
            isRecommended: true,
        },
        {
            name: 'The Warm Drum',
            address: '26 Ang Mo Kio Industrial Park 2 #01-38, AMK - 569507',
            location: 'Ang Mo Kio',
            latitude: 1.373742,
            longitude: 103.863452,
            rating: 3,
            description: 'Fresh meat cuts are available.',
            imageLocation: '/images/warmdrum-amk-image.jpeg',
            isDeleted: false,
            isRecommended: false,
        },
        { name: 'Fried Rice Stall', address: '456 Fuckbum ASU', location: 'Punggol', rating: 2.67, description: 'idkman pt.2', imageLocation: '/images/leanbento-amk-image.jpeg', isDeleted: false, },
    ]);

    FoodItems.bulkCreate([
        { name: 'Aglio Olio', calories: 571, imageLocation: "/images/food-image-1.png", ShopId: 1, isRecommended: false, },
        { name: 'Cesear Salad', calories: 346, imageLocation: "/images/food-image-2.png", ShopId: 1, isRecommended: true, },
        { name: 'Cream of Mushroom Soup', calories: 827, imageLocation: "/images/food-image-3.png", ShopId: 1, isRecommended: false, },
        { name: 'Carbonara', calories: 436, imageLocation: "/images/food-image-4.jpg", ShopId: 1, isRecommended: true, },
        { name: 'Mushroom Pasta', calories: 682, imageLocation: "/images/food-image-5.hpg", ShopId: 1, isRecommended: false, },
        { name: 'Teriyaki Bento', calories: 682, imageLocation: "/images/food-image-6.png", ShopId: 2, isRecommended: false, },
    ]);

    // The password for the following accounts is just 'password'
    Users.bulkCreate([
        { 
            name: 'User', 
            email: "user@mail.com", 
            password: '$2a$10$JgDMXgbEoiJdzIn8pk11Zusq2E0p8aq3ccCoqyv9dgInOK3xGGYJ6',
            height: 1.78, 
            weight: 74, 
            location: null, 
            latitude: null, 
            longitude: null,
            isAdmin: false, 
            isVendor: false, 
            isBanned: false 
        },
        { 
            name: 'Admin', 
            email: "admin@foodhubsg.com", 
            password: '$2a$10$wQZ8DoV.HcnEBsks4mrIZO5bauhynH.puDtMCbH1axpDV71htRQM2', 
            height: null, 
            weight: null, 
            location: null, 
            latitude: null,
            longitude: null,
            isAdmin: true, 
            isVendor: false, 
            isBanned: false 
        },
        // { 
        //     name: 'ABR Holdings', 
        //     email: "admin@abrholdings.com", 
        //     password: '$2a$10$1ZxU3n6AqWrAlOeuFkxLYOsUpnMTcu4BAlu4AANCFSoyJJLi7kBo2', 
        //     height: null, 
        //     weight: null, 
        //     location: null, 
        //     isAdmin: false, 
        //     isVendor: true, 
        //     isBanned: false 
        // },
    ]);

    // Vendors.bulkCreate([
    //     { UserId: 3, id: 3, },
    // ]);
};

module.exports = createInstance;