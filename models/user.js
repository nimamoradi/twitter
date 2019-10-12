'use strict';

let stemmer = require('stemmer')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.CHAR(15),
        remote_user_id: DataTypes.CHAR(64),
        bio: DataTypes.CHAR(160),
        role: DataTypes.INTEGER(1),
        bio_hastag: DataTypes.CHAR(160),
        followers_count: DataTypes.CHAR(64),
        friends_count: DataTypes.CHAR(64),
        verified: {type: DataTypes.BOOLEAN, defaultValue: false},
        tweet_count: DataTypes.CHAR(64),
    }, {
        instanceMethods:
            {
                getTweets: function () {
                    console.log('tweet ' + JSON.stringify(this));
                    const models = require('../models/index');
                    return models.Tweets.findAll({
                        where: {
                            'remote_user_tweeted': this.remote_user_id,
                            'is_retweet': 0
                        }
                    }).then((tweet) => {
                        // let max = new Date(-8640000000000000);
                        //
                        // for (let i = 0; i < tweet.length; i++) {
                        //     let temp = new Date(tweet[i].createdAt);
                        //     max = (temp > max ? temp : max);
                        // }
                        // console.log("max " + max);
                        // let period = max;
                        // period.setMonth(period.getMonth() - 6);
                        // console.log("period " + period);
                        // // period = period.get();
                        // console.log("tweet Ss" + tweet);
                        console.log("tweet " + tweet.length);
                        tweet = tweet.filter(item =>
                            item_filter(item.text.toLowerCase())
                        );
                        let tweet_str = '';
                        for (let i = 0; i < tweet.length; i++) {
                            tweet_str += saveToFile(this.username, tweet[i])
                        }
                        const fs = require('fs');
                        if (tweet_str !== null && tweet_str !== '')
                            fs.appendFile("D:\\data\\user_normal\\" + this.username + ".txt", tweet_str + "\n", function (err) {
                                if (err) throw err;
                                // console.log('Saved!');
                            });
                        console.log("tweet Ss" + this.username);

                    });
                }
            }
    });

    function item_filter(tweet_str) {
        let scold_not_omit = true;
        let res = tweet_str.match(/\W(\w*auti\w*)\b/g);

        if (res === null || res.length === 0)
            return scold_not_omit;
        res.forEach((item) => {
            if (!item.includes('@'))
                scold_not_omit = false;
        });
        return scold_not_omit;
    }

    function saveToFile(username, tweet) {

        let text = tweet.text;
        text = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        text = stemmer(text);
        return text + '\n';

    }

    return User;
}
;
