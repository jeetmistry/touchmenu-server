const Cart = require("../model/Cart");

exports.addCart = async(req,res)=>{
    const data = req.body;
    const cart = {
        restaurant_id : data.restaurant_id,
        item_id:data.item_id,
        table_id:data.table_id,
        total_amount:data.total_amount*data.quantity,
        quantity:data.quantity,
        image:data.item_image,
        item_name : data.item_name
    }

    const newCartItem = new Cart(cart);
    const response = await newCartItem.save();
    context = {"message" : "Item added to cart"};
    res.json(context);
}

//req has restaurant id and table id for showing items in the cart
exports.showCart = async(req,res)=>{
    try{
        const data = await Cart.find({restaurant_id : req.params.id,table_id:req.params.table_id});
        if(data.length>0){
            console.log("Showing the Items in Cart");
            res.json(data);
        }else{
            context = {"message" : "No Items found in cart"}
            res.json(context)
        }
    }catch(err){
        console.log(err);
        context = {"message" : "Table doesn't contain any items yet"};
        res.json(context)
    }
}

//req has restaurant id, item_id and table id for deleting particular item from the cart
exports.removeItemFromCart = async(req,res)=>{
    const data = req.params;
    console.log(data)
    try{
        const response = await Cart.deleteOne({_id:data.id});
        res.json({message:"Item Removed From Cart"});
    }catch(err){
        console.log(err);
        res.json({"message":"error"})
    }
}

//req has restaurant id and table id for deleting particular item from the cart
exports.deleteCart = async(req,res)=>{
    const data = req.params;
    console.log(data)
    try{
        const response = await Cart.deleteMany({restaurant_id:data.restaurant_id,table_id:data.table_id});
        res.json(response);
    }catch(err){
        console.log(err);
        res.json({"message":"error"})
    }
}