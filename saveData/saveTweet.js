const user = require("../models/user");
const models = require('../models/index');
const Tweets = require('../models/tweet');
module.exports = function (tweet) {
    let newTweet = {};
    newTweet.twitter = tweet.id_str;
    newTweet.text = tweet.text;
    //
    let user_mentions = "";
    for (let i = 0; i < tweet.entities.user_mentions.length; i++) {
        user_mentions += tweet.entities.user_mentions[0].screen_name + "@";
    }
    newTweet.user_mentions = user_mentions;
    //

    newTweet.remote_user_tweeted = tweet.user.id_str;
    newTweet.is_retweet = tweet.retweeted_status != null;
    if (newTweet.is_retweet) {
        newTweet.orginal_tweet_id = tweet.retweeted_status.id_str;
        newTweet.orginal_tweet_user_id =
            tweet.retweeted_status.user.id_str;
    }
    // newTweet.hastags = use.verified;

    newTweet.like_count = tweet.favorite_count;
    newTweet.view_count = tweet.retweet_count;
    newTweet.in_reply_to_user_id_str = tweet.in_reply_to_user_id_str;
    newTweet.is_reply = tweet.in_reply_to_user_id_str !== null;

    let hastags = "";


    const newTweet_db = models.Tweets.build(newTweet);
    newTweet_db.save().then((Result) => {
        console.log(Result)
        // my nice callback stuff
    }).catch(error => {
        // mhhh, wth!
        console.log(error)

    });

    return newTweet;
};

