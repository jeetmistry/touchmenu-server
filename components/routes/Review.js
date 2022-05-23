const express = require('express');
const { analyseReview,submitReview} = require('../controller/Review');
const router = express.Router()

//post request to analyse the review positive or negative
router.post("/analyse",analyseReview);

//post a review
router.post("/submitReview",submitReview);
module.exports = router;