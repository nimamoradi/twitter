const express = require('express');
const router = express.Router();
const keys = require('../data/keys');
const Twitter = require('twitter');
const saveUser = require('../saveData/saveUser');


module.exports = function () {
    let fs = require('fs'),
        readline = require('readline');

    let rd = readline.createInterface({
        input: fs.createReadStream('./data/normal.txt'),
        output: process.stdout,
        console: false
    });


    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });
    rd.on('line', function (line) {
        console.log(line);
        client.get('users/show.json', {screen_name: line})
            .then(function (tweet) {
                console.log(tweet);
                (saveUser(tweet));
            })
            .catch(function (error) {
                res.send(error);
            });
    });
};


