const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    restaurant_id : {
        type : mongoose.Types.ObjectId
    },
    item_name : {
        type : String
    },
    item_description : {
        type : String
    },
    item_rating : {
        //item rating out of 5
        type : Number
    },
    total_item_rating : {
        //total number of ratings provided 
        type : Number
    },
    item_type : {
        //veg / non veg 
        type : String
    },
    item_image : {
        type : String
    },
    item_price : {
        type : Number
    }

});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;