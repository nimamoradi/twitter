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
                        where: {'remote_user_tweeted': this.remote_user_id}
                    }).then((tweet) => {
                        let max = new Date(-8640000000000000);

                        for (let i = 0; i < tweet.length; i++) {
                            let temp = new Date(tweet[i].createdAt);
                            max = (temp > max ? temp : max);
                        }
                        console.log("max " + max);
                        let period = max;
                        period.setMonth(period.getMonth() - 6);
                        console.log("period " + period);
                        // period = period.get();
                        console.log("tweet Ss" + tweet);
                        tweet = tweet.filter(function (item) {
                            return item.createdAt > period
                        });
                        for (let i = 0; i < tweet.length; i++) {
                            saveToFile(this.username, tweet[i])
                        }
                        console.log("tweet Ss" + tweet)
                    });
                }
            }
    });

    function saveToFile(username, tweet) {
        const fs = require('fs');
        let text = tweet.text;
        text = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        text = stemmer(text);
        if (text !== null && text !== '')
            fs.appendFile("D:\\data\\user_6_normal\\" + username + ".txt", text + "\n", function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
    }

    return User;
}
;