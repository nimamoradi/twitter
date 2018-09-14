var models  = require('../models');
var express = require('express');
var router  = express.Router();
const keys = require('../data/keys');
const Twitter = require('twitter');
router.get('/', function(req, res) {
    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });

    client.get('users/suggestions.json', {
        'lang':'en'
    })
        .then(function (tweets) {
            res.send(tweets);
        })
        .catch(function (error) {
            res.send(error);
        });

});

module.exports = router;
