const express = require('express');

const saveTweet = require('../saveData/saveTweet');
const keys = require('../data/keys');
const Twitter = require('twitter');
let client = new Twitter({
    consumer_key: keys.TWITTER_CONSUMER_KEY,
    consumer_secret: keys.TWITTER_CONSUMER_SECRET,
    access_token_key: keys.TWITTER_ACCESS_TOKEN,
    access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
});

/* GET users listing. */
function allUserTweet(req, res, user) {

    client.get('statuses/user_timeline.json', {
        screen_name: user.username,
        count: 200,
    })
        .then(function (tweets) {
            console.log(tweets);
            for (let i = 0; i < tweets.length; i++) {
                saveTweet(tweets[i])
            }
            console.log("tweets.length " + tweets.length);
            if (parseInt(user.tweet_count) > 200)
                loadRecursive(user.username, tweets[tweets.length - 1].id_str,
                    tweets.length, parseInt(user.tweet_count));
            res.send(tweets[1].text);
            console.log(tweets);
        })
        .catch(function (error) {
            // res.send(error);
            console.log(error);
            syscall.exit(-1);
        });


}

function loadRecursive(screen_name, max_id, founded, total) {
    console.log("tweets.founded " + founded + " " + max_id + " " + total);
    if (founded < total && (founded < 3200))
        client.get('statuses/user_timeline.json', {
            screen_name: screen_name,
            count: 200,
            max_id: max_id
        })
            .then(function (tweets) {
                console.log(tweets);
                for (let i = 0; i < tweets.length; i++) {
                    saveTweet(tweets[i])
                }
                console.log("tweets.length " + tweets.length);
                loadRecursive(screen_name, tweets[tweets.length - 1].id_str, founded + tweets.length, total);
            })
            .catch(function (error) {

            });

}


module.exports = allUserTweet;
