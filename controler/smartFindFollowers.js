const user = require("../models/user");
const models = require('../models/index');
const keys = require('../data/keys');
const Twitter = require('twitter');
const getFollowers = require('./getFollowersList')
module.exports = function (id) {
    let client = new Twitter({
        consumer_key: keys.TWITTER_CONSUMER_KEY,
        consumer_secret: keys.TWITTER_CONSUMER_SECRET,
        access_token_key: keys.TWITTER_ACCESS_TOKEN,
        access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });
    models.User.find({
        where:
            {
                'id': id,
            },
    }).then(function (result) {
        models.user_relation.findAll({
            where:
                {
                    'user_destination_id': result.remote_user_id,//
                },
        }).then(function (ok) {
            if (ok !== null && ok.length >= result.followers_count) {
                console.log("user is ok " + id)
            }
            else {
                console.log("find user " + id)
                fix(client,result)
            }
        });
    });

};

function fix(client, result) {
    let next_cursor = "-1";
    let index = result.followers_count;

    while (index >= 5000) {
        clientRequest(client, next_cursor,result);
        index -= 5000;
    }
}

function clientRequest(client, next_cursor,result) {
    client.get('followers/ids.json', {screen_name: result.username, stringify_ids: true, cursor: next_cursor})
        .then((tweet) => {
            console.log(tweet);
            next_cursor = tweet.next_cursor_str;
            getFollowers({sourceID: result.remote_user_id, ids: tweet.ids});
        })
        .catch(function (error) {
            console.log(error);

        });
}
