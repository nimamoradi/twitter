const express = require('express');
const router = express.Router();
const models = require('../models/index');
const keys = require('../data/keys');
const Twitter = require('twitter');
const getFollowers = require('../controler/getFollowersList');
/* GET users listing. */
router.get('/', function (req, res, next) {
    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });
    let index = 0;
    models.User.findAll({}).then(userResponse => {
        // res.json({sourceID: userResponse[0].remote_user_id,});


        for (let i = 0; i < userResponse.length; i++) {
            setInterval(function () {
                client.get('followers/ids.json', {screen_name: userResponse[i].username, stringify_ids: true})
                    .then(function (tweet) {
                        getFollowers({sourceID: userResponse[i].remote_user_id, ids: tweet.ids});
                    })
                    .catch(function (error) {
                        res.send(error+index);
                        process.exit(index)
                    });
            }, 15000);//for twitter limits
            index = i;
        }

    })
        .catch(error => {
            res.json(error + index)
            process.exit(index)
        });


});


module.exports = router;
