const user = require("../models/user");
const models = require('../models/index');
const keys = require('../data/keys');
const Twitter = require('twitter');

const getFriends = require("../controler/getFriends");

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
            where: {'user_source_id': result.remote_user_id,},
        }).then(function (ok) {
            console.log("user is " + result.toString() + " " + ok.length);
            if (ok !== null && ok.length >= result.friends_count) {
                console.log("user is ok " + id)
            }
            else {
                fix(client, result)
            }
        });
    });


};

function fix(client, result) {
    let next_cursor = "-1";
    let index = result.friends_count;
    if (index < 5000)
        clientRequest(client, next_cursor, result);
    else {
        while (index >= 5000) {
            next_cursor = clientRequest(client, next_cursor, result);
            index -= 5000;

        }
        if (index < 5000)
            clientRequest(client, next_cursor, result);
    }
}

function clientRequest(client, next_cursor, result) {
    client.get('friends/ids.json', {screen_name: result.username, stringify_ids: true, cursor: next_cursor})
        .then((tweet) => {
            // res.json(tweet);
            getFriends({sourceID: result.remote_user_id, ids: tweet.ids});
            return tweet.next_cursor_str;
        })
        .catch(function (error) {
            console.log(error);
        });

}
