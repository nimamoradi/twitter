const express = require('express');
const router = express.Router();
const models = require('../models/index');
const keys = require('../data/keys');
const Twitter = require('twitter');
const getFollowers = require('../controler/getFollowersList');
const getFriends = require('../controler/getFriends');
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
    let interval = setInterval(function () {
        models.User.findOne({where: {'id': index1}}).then(userResponse => {
            if (index1 === 89) clearInterval(interval);
            else index1++;
            client.get('followers/ids.json', {screen_name: userResponse.username, stringify_ids: true})
                .then((tweet) => {
                    // res.json(tweet);
                    getFollowers({sourceID: userResponse.remote_user_id, ids: tweet.ids});
                })
                .catch(function (error) {
                    res.send(error);

                });

        });
    }, 61000);

    let interval2 = setInterval(function () {
        models.User.findOne({where: {'id': index2}}).then(userResponse => {
            if (index2 === 89) clearInterval(interval2);
            else index2++;
            client.get('friends/ids.json', {screen_name: userResponse.username, stringify_ids: true})
                .then((tweet) => {
                    // res.json(tweet);
                    getFriends({sourceID: userResponse.remote_user_id, ids: tweet.ids});
                })
                .catch(function (error) {
                    res.send(error);

                });

        });
    }, 65000);

});

module.exports = router;
