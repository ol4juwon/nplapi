const mongoose = require('mongoose')


const ListingSchema = mongoose.Schema({
    title: String,
    location: String,
    price: Number,
    date_added: Date,
    bedrooms: Number,
    bathroom:Number,
    toilets: Number,
    serviced: Boolean,
    furnished: Boolean,
    agent_id: Number,
    type: String,
    img_src: String
});

module.exports = mongoose.model('listing',ListingSchema);