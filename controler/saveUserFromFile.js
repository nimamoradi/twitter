const express = require('express');
const router = express.Router();
const keys = require('../data/keys');
const Twitter = require('twitter');
const saveUser = require('../saveData/saveUser');


module.exports = function (req, res, next) {
    let fs = require('fs'),
        readline = require('readline');

    let rd = readline.createInterface({
        input: fs.createReadStream('./data/autism.txt'),
        output: process.stdout,
        console: false
    });

    let list = [];
    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });
    rd.on('line', function (line) {

        list.push(line)
    });
    let count = 0;
    console.log(list);
    let interval = setInterval(function () {
        if (count === list.length)
            clearInterval(interval);
        request(list[count], client, res);
        count++;
    }, 1000);

};

function request(line, client, res) {
    client.get('users/show.json', {screen_name: line})
        .then(function (tweet) {
            console.log(tweet);
            (saveUser(tweet));
        })
        .catch(function (error) {
            console.log(error);
        });

}

