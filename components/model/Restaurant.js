const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    restaurant_name : {
        type : String,
        Required : true
    },
    restaurant_email: {
        type : String,
        Required : true
    },
    restaurant_password : {
        type : String,
        Required : true
    },
    restaurant_rating : {
        type : Number,
        Required : true
    },
    restaurant_total_reviews : {
        type : Number,
        Required : true
    },
    restaurant_positive_reviews : {
        type : Number,
        Required : true
    },
    restaurant_address : {
        type : String,
        Required : true
    },
    restaurant_total_orders : {
        type : Number,
        Required : true
    },
    restaurant_total_tables : {
        type : Number,
        Required : true
    },
    restaurant_tables_occupied : {
        type : Number,
        Required : true
    },
    restaurant_url : {
        type : String,
        Required : true
    }
})

const Restaurant = mongoose.model('Restaurant',restaurantSchema);

module.exports = Restaurant
