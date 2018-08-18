const express = require('express');
const router = express.Router();
const keys = require('../data/keys');
const Twitter = require('twitter');
const saveTweet = require('../saveData/saveTweet');


module.exports = function () {
    var fs = require('fs');
    var obj;
    fs.readFile('./data/tweet.txt', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        saveTweet(obj);
    });





};


