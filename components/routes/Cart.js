const express = require('express')
const router = express.Router()
const {addCart, showCart,removeItemFromCart,deleteCart} = require("../controller/Cart");

//add add item to the cart
router.post("/addcart",addCart);

//show the items in the cart
router.get("/showcart/:id/:table_id",showCart);

//remove particular item from the cart
router.get("/removeCart/:id",removeItemFromCart);

// delete whole cart of a particular table
router.get("/deletecart/:restaurant_id/:table_id",deleteCart);

module.exports = router