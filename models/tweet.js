'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tweet = sequelize.define('Tweets', {
        twitter: DataTypes.CHAR(64),
        text: DataTypes.TEXT(280),
        user_mentions: DataTypes.TEXT(280),
        hastags: DataTypes.TEXT(280),
        like_count: DataTypes.INTEGER(10),
        view_count: DataTypes.INTEGER(10),
        is_retweet: DataTypes.INTEGER(1),
        remote_user_tweeted: DataTypes.CHAR(64),//who tweeted
        orginal_tweet_id: DataTypes.CHAR(64),
        orginal_tweet_user_id: DataTypes.CHAR(64),
    });


    Tweet.associate = function (models) {
        models.Tweets.hasOne(models.User, {
            foreignKey: 'remote_user_id', targetKey: 'remote_user_tweeted', as: "user"
        });
    };

    return Tweet;
};