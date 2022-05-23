const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    restaurant_id : {
        type : mongoose.Types.ObjectId
    },
    table_id : {
        type : Number
    },
    total_amount : {
        type : Number
    },
    status : {
        //pending or completed
        type : String
    },
    items:{
        type : Array
    }
});

const Orders = mongoose.model("Orders",orderSchema);

module.exports = Orders;