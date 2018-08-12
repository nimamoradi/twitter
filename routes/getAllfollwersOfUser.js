const express = require('express');
const router = express.Router();
const models = require('../models/index');
const keys = require('../data/keys');
const Twitter = require('twitter');
const getFollowers = require('../controler/smartFindFollowers');
const getFriends = require('../controler/smartFind');

/* GET users listing. */
router.get('/:id', function (req, res, next) {
    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });
    let index1 = 1;
    let index2 = 1;


    let inte = setInterval(function () {
        if (index1 === 2)
            clearInterval(inte);
        getFollowers(index1);
        index1++;
    }, 4000);
    //    let inte2 = setInterval(function () {
    //     //     if (index2 === 89) {
    //     //         clearInterval(inte2);
    //     //
    //     //         console.log("dam exit ")
    //     //     }
    //     //     getFriends(index2);
    //     //     index2++;
    //     // }, 6000)


});

module.exports = router;
