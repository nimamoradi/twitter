'use strict';


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
                        for (let i = 0; i < tweet.length; i++) {
                            saveToFile(this.username, tweet[i])
                        }
                    });
                }
            }
    });

    function saveToFile(username, tweet) {
        const fs = require('fs');
        //
        // let writeStream = fs.createWriteStream("D:\\data\\user\\" + username + ".txt");
        // writeStream.write(tweet.text);
        // writeStream.end();
        fs.appendFile("D:\\data\\user\\" + username + ".txt", tweet.text + "\n", function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

    return User;
}
;