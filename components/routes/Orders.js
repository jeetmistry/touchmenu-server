const express = require('express')
const router = express.Router()
const {placeOrder, getOrders,getCustomerOrders,getRestaurantOrders,updteOrderStatus}  = require("../controller/Orders");

router.post("/placeorder",placeOrder);

//get orders for restaurant to keep track 
router.get("/getorder/:restaurant_id/:table_id",getOrders);

//get order for restaurant
router.get("/getorder/:restaurant_id",getRestaurantOrders);

//get single order of the customer 
router.get("/getcustomerorder/:restaurant_id/:table_id",getCustomerOrders);

//update order status from restaurant 
router.put("/updateorder",updteOrderStatus);


module.exports = router