const Campground = require('../models/campground')
const mongoose = require('mongoose')
const path = require('path')
const cities = require('./cities')
const seedHelpers = require('./seedHelpers')
const { loadConfigFromFile } = require('vite')


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const c = new Campground({
            title: `${seedHelpers.descriptors[Math.floor(Math.random() * seedHelpers.descriptors.length)], seedHelpers.places[Math.floor(Math.random() * seedHelpers.places.length)]}`,
            price: `${Math.floor(Math.random() * 10000)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.A velit consequuntur praesentium ea fugiat molestias tempora maxime quo quisquam? Iusto ducimus modi magnam quas eveniet dolorum officiis! Totam, quae repudiandae.",
            location: `${cities[Math.floor(Math.random() * 1000)].city, cities[Math.floor(Math.random() * 1000)].state}`,
            image: 'https://source.unsplash.com/collection/483251'
        })
        await c.save();
    }
    console.log(' 50 Campgrounds Added!!');
}

seedDB();