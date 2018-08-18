const express = require('express');
const router = express.Router();
const saveTweet = require('../saveData/saveTweet');
const keys = require('../data/keys');
const Twitter = require('twitter');

/* GET users listing. */
router.get('/', function (req, res, next) {


    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });


    client.get('statuses/user_timeline.json', {screen_name: 'Masoud_erfaniii',count:3200})
        .then(function (tweets) {
            console.log(tweets);
            for (let i = 0; i < tweets.length; i++) {
                saveTweet(tweets[i])
            }
            console.log("tweets.length "+tweets.length);
            res.send(tweets);
        })
        .catch(function (error) {
            res.send(error);
        });


});


module.exports = router;
