const express = require('express')
const router = express.Router()
const {registerRestaurant,loginRestaurant, listRestaurants, getRestaurant, updateRestaurant} = require("../controller/Restaurant");

router.post("/register",registerRestaurant);
router.post("/login",loginRestaurant);

//list all the restaurants 
router.get("/showRestaurants",listRestaurants);

//get details of the restaurant
router.post("/getRestaurant",getRestaurant);

//update restaurant details
router.put("/update",updateRestaurant);
module.exports = router