const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database connected!');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);

        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '60a87fef3bfbbe7f76b5c84d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, omnis.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsx5ulgrt/image/upload/v1621444125/YelpCamp/zy1yledx68xlhvaxiwmg.png',
                    filename: 'YelpCamp/zy1yledx68xlhvaxiwmg'
                },
                {
                    url: 'https://res.cloudinary.com/dsx5ulgrt/image/upload/v1621444125/YelpCamp/z4k2ahhgjlja0xybpriv.png',
                    filename: 'YelpCamp/z4k2ahhgjlja0xybpriv'
                }
            ]
        });
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    });