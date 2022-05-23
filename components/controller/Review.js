const Menu = require("../model/Menu");
const Restaurant = require("../model/Restaurant");
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const axios = require('axios');

exports.analyseReview = (req,res)=>{
    const review = req.body.review;
    console.log(review)

    //converting the review to lex form that is I'm should be I am we're should be we are
    const lexedReview = aposToLexForm(review);

    //converting the laxed form to lowercase for uniformity 
    const casedReview = lexedReview.toLowerCase();

    //removing all the special characters
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');

    //tokenizig the words from natural library
    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

    //correcting the spelling if it is wrong for every tokenized words
    const spellCorrector = new SpellCorrector();
    spellCorrector.loadDictionary();

    tokenizedReview.forEach((word, index) => {
        tokenizedReview[index] = spellCorrector.correct(word);
    })

    //remove stopwords from the tokenized words 
    const filteredReview = SW.removeStopwords(tokenizedReview);

    //importing sentiment analyzer from the natural library
    const { SentimentAnalyzer, PorterStemmer } = natural;

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

    //performing the analysis and if it is greater than 0 then positive else negative or neutral at 0
    const analysis = analyzer.getSentiment(filteredReview);

    res.status(200).json({ analysis });
}


//submit review to sentiment analysis and perform all the ratings and review task in one request
exports.submitReview = async(req,res)=>{
    const data = req.body;
    console.log(data);
    try{
        for(ratings in data.ratings){
            console.log(ratings);
            const menu = await Menu.findOne({_id:ratings});
            console.log(menu);

            let old_ratings = menu.item_rating;
            let old_total_rating = menu.total_item_rating;
            let new_total_rating = old_total_rating+1;
            let new_rating = old_ratings + data.ratings[ratings];
            new_rating = (new_rating/new_total_rating).toFixed(2);

            await Menu.updateOne({_id:ratings},{item_rating:new_rating,total_item_rating:new_total_rating});
        }

        //adding review for restaurant
        let sentiment_text = {
            text : data.review
        }

        //get the restaurant details
        const restaurant = await Restaurant.findOne({_id:data.restaurant_id});
        console.log(restaurant);
        //request to api for getting the sentiment 
        const sentiment = await axios.post("https://sentim-api.herokuapp.com/api/v1/",sentiment_text);

        console.log(sentiment.data)
        //response will be in response.data.result.type
        let res_pos_review = restaurant.restaurant_positive_reviews;
        let res_tot_review = restaurant.restaurant_total_reviews;
        console.log(res_pos_review,res_tot_review)
        let rating = 0;
        let message = "";
        if(sentiment.data.result.type=="positive"){
            message = "Thank you for your positive review, please visit again for more delicious food"
            rating+=1
            res_pos_review+=1
        }else{
            message = "We are really sorry for your experience, we hope to serve better next time"
        }
        res_tot_review+=1;

        let new_rating = ((res_pos_review/res_tot_review)*5).toFixed(2);
        await Restaurant.updateOne({_id:data.restaurant_id},{restaurant_total_reviews:res_tot_review,restaurant_positive_reviews:res_pos_review,restaurant_rating:new_rating});
    
        res.json({message:"Thanks for Submitting your Review - "+message})
    }catch(err){
        console.log(err);
        res.json({message:"error"});
    }
    
}