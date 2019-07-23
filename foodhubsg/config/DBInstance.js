function createInstance(Badge) {
    Badge.bulkCreate([
        {
            name: 'Seedling',
            description: 'A badge to start off your journey with us',
            imageLocation: '/images/seedling-badge.png'
        },
        {
            name: 'First Friend',
            description: 'Added your first friend',
            imageLocation: '/images/first-contact-badge.png'
        },
        {
            name: 'High Roller',
            description: 'Obtained a 1000 health points',
            imageLocation: '/images/high-roller-badge.png'
        },
        {
            name: 'Baby Steps',
            description: 'You have entered your first healthy food',
            imageLocation: '/images/baby-steps-badge.png'
        },

        {
            name: 'On Your Way Up',
            description: 'You have entered 10 healthy food items, that is a long way to go',
            imageLocation: '/images/seedling-badge.png'
        },

        {
            name: 'Full House',
            description: 'Ten friends, that is more than enough to fully fill a house',
            imageLocation: '/images/seedling-badge.png'
        },

        {
            name: 'A Week Of Health',
            description: 'On your way to being a healthy eater, keep it up',
            imageLocation: '/images/seedling-badge.png'
        }, 

    ]);

    // The password for the following accounts is just 'password'
    // Users.bulkCreate([
    //     { 
    //         name: 'User', 
    //         email: "user@mail.com", 
    //         password: '$2a$10$JgDMXgbEoiJdzIn8pk11Zusq2E0p8aq3ccCoqyv9dgInOK3xGGYJ6',
    //         isDeleted: false,
    //         isAdmin: false, 
    //         isVendor: false, 
    //         isBanned: false,
    //         height: 1.76,
    //         weight: 72,
    //         bmi: 23.2,
    //         gainedPoints: 100,
    //         refCode: "a00001"
    //     },
    //     { 
    //         name: 'Admin', 
    //         email: "admin@foodhubsg.com", 
    //         password: '$2a$10$wQZ8DoV.HcnEBsks4mrIZO5bauhynH.puDtMCbH1axpDV71htRQM2', 
    //         height: null, 
    //         weight: null,
    //         isDeleted: false,
    //         isAdmin: true, 
    //         isVendor: false, 
    //         isBanned: false 
    //     },
    //     { 
    //         name: 'ABR Holdings', 
    //         email: "admin@abrholdings.com", 
    //         password: '$2a$10$1ZxU3n6AqWrAlOeuFkxLYOsUpnMTcu4BAlu4AANCFSoyJJLi7kBo2', 
    //         height: null, 
    //         weight: null, 
    //         isDeleted: false,
    //         isAdmin: false, 
    //         isVendor: true, 
    //         isBanned: false 
    //     },
    // ]);

    // Shops.bulkCreate([
    //     {
    //         name: 'Misaka',
    //         address: '1 Sengkang Square #01-225, Sengkang - 545078',
    //         latitude: 1.391430,
    //         longitude: 103.893420,
    //         location: 'Sengkang',
    //         description: 'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients',
    //         imageLocation: '/images/misaka-sengkang-image.jpeg',
    //         isDeleted: false,
    //         isRecommended: false,
    //         VendorId: 3,
    //     },
    //     {
    //         name: 'The Bistro',
    //         address: '1 Sengkang Square #02-336, Sengkang - 545078',
    //         location: 'Sengkang',
    //         latitude: 1.391299,
    //         longitude: 103.893600,
    //         description: 'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients',
    //         imageLocation: '/images/thebistro-sengkang-image.jpeg',
    //         isDeleted: false,
    //         isRecommended: false,
    //         VendorId: 3,
    //     },
    //     {
    //         name: 'Grains',
    //         address: '26 Ang Mo Kio Industrial Park 2 #01-00, AMK - 569507',
    //         location: 'Ang Mo Kio',
    //         latitude: 1.373938,
    //         longitude: 103.862897,
    //         rating: 4,
    //         description: 'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.',
    //         imageLocation: '/images/grains-amk-image.jpg',
    //         isDeleted: false,
    //         isRecommended: true,
    //         VendorId: 3,
    //     },
    //     {
    //         name: 'Lean Bento',
    //         address: '36 Ang Mo Kio Hub #02-36, AMK - 569507',
    //         location: 'Ang Mo Kio',
    //         latitude: 1.370057,
    //         longitude: 103.848459,
    //         rating: 3,
    //         description: 'The blatantly correct choice.',
    //         imageLocation: '/images/leanbento-amk-image.jpeg',
    //         isDeleted: false,
    //         isRecommended: true,
    //         VendorId: 3,
    //     },
    //     {
    //         name: 'The Lawn',
    //         address: '26 Ang Mo Kio Industrial Park 2 #03-97, AMK - 569507',
    //         location: 'Ang Mo Kio',
    //         latitude: 1.373168,
    //         longitude: 103.863563,
    //         description: 'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.',
    //         imageLocation: '/images/thelawn-amk-image.jpeg',
    //         isDeleted: false,
    //         isRecommended: false,
    //         VendorId: 3,
    //     },
    //     {
    //         name: 'The Warm Drum',
    //         address: '26 Ang Mo Kio Industrial Park 2 #01-38, AMK - 569507',
    //         location: 'Ang Mo Kio',
    //         latitude: 1.373742,
    //         longitude: 103.863452,
    //         description: 'Fresh meat cuts are available.',
    //         imageLocation: '/images/warmdrum-amk-image.jpeg',
    //         isDeleted: false,
    //         isRecommended: false,
    //         VendorId: 3,
    //     },
    // ]);

    // FoodItems.bulkCreate([
    //     { name: 'Aglio Olio', calories: 571, imageLocation: "/images/food-image-1.png", ShopId: 3, isRecommended: false, isDeleted: false, },
    //     { name: 'Cesear Salad', calories: 346, imageLocation: "/images/food-image-2.png", ShopId: 3, isRecommended: true, isDeleted: false, },
    //     { name: 'Cream of Mushroom Soup', calories: 207, imageLocation: "/images/food-image-8.jpg", ShopId: 3, isRecommended: true, isDeleted: false, },
    //     { name: 'Chicken Rice', calories: 436, imageLocation: "/images/food-image-4.jpg", ShopId: 3, isRecommended: true, isDeleted: false, },
    //     { name: 'Chicken Pulao', calories: 682, imageLocation: "/images/food-image-5.jpg", ShopId: 3, isRecommended: false, isDeleted: false, },
    //     { name: 'Mixed Vegetable Rice', calories: 682, imageLocation: "/images/food-image-6.png", ShopId: 2, isRecommended: false, isDeleted: false, },
    // ]);
};

module.exports = createInstance;