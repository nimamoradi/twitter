var express = require('express');
var router = express.Router();
const models = require('../models/index');
const request = require('request');
const keys = require('../data/keys');
var Twitter = require('twitter');

/* GET users listing. */
router.get('/', function (req, res, next) {


    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });
    client.get('users/show.json', {screen_name: 'ni_moradi'})
        .then(function (tweet) {
            res.json(tweet);
        })
        .catch(function (error) {
            res.send(error);
        });
});


module.exports = router;
