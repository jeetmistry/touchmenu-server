const Orders = require("../model/Orders");
const Cart = require("../model/Cart");
const Restaurant = require("../model/Restaurant");


//place order for customer 
exports.placeOrder = async(req,res)=>{
    const data = req.body
    const order = {
        restaurant_id:data.restaurant_id,
        table_id:data.table_id,
        total_amount:data.total_amount,
        status:"Order Placed",
        items:data.items
    }
    try{
        const response = await Cart.deleteMany({restaurant_id:data.restaurant_id,table_id:data.table_id});
    }catch(err){
        console.log(err);
        res.json({"message":"error"})
    }
    const newOrder = new Orders(order);
    const response = await newOrder.save();

    //update order number of restaurnt as soon as order is placed
    const restaurant = await Restaurant.findById({_id:data.restaurant_id});
    let orders = restaurant.restaurant_total_orders;
    orders+=1;

    //update the restaurant total orders
    await Restaurant.updateOne({_id:data.restaurant_id},{restaurant_total_orders:orders});

    res.json(response);
}


//get orders for restaurant
exports.getOrders = async(req,res)=>{
    const id = req.params.restaurant_id;
    const table = req.params.table_id;
    try{
        const response = await Orders.find({restaurant_id:id,table_id:table});
        res.json(response);
    }catch(err){
        console.log(err);
        res.json({"message": "error"});
    }
}

//get order data for customer who placed order
exports.getCustomerOrders = async(req,res)=>{
    const id = req.params.restaurant_id;
    const table = req.params.table_id;
    try{
        const response = await Orders.find({restaurant_id:id,table_id:table}).sort({_id:-1}).limit(1);
        res.json(response);
    }catch(err){
        console.log(err);
        res.json({"message": "error"});
    }
}

exports.getRestaurantOrders = async(req,res)=>{
    const id = req.params.restaurant_id;
    try{
        const response = await Orders.find({restaurant_id:id}).sort({_id:-1});
        res.json(response);
    }catch(err){
        console.log(err);
        res.json({"message": "error"});
    }
}

// update order status from restaurant side like accept order or reject order or order completed
exports.updteOrderStatus = async(req,res)=>{
    const id = req.body.id;
    const status = req.body.status;
    try{
        await Orders.updateOne({_id:id},{status:status});
        res.json({message:"Order Status Updated"})
    }catch(err){
        console.log(err);
        res.json({"message": "error"});
    }
}