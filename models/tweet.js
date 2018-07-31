'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tweet = sequelize.define('Tweet', {
        twitter: DataTypes.INTEGER(10),
        text: DataTypes.TEXT(280),
        user_mentions: DataTypes.TEXT(280),
        hastags: DataTypes.TEXT(280),
        like_count: DataTypes.INTEGER(10),
        view_count: DataTypes.INTEGER(10),
        is_retweet: DataTypes.INTEGER(1),
        user_tweet_id: DataTypes.INTEGER(10),
        orginal_tweet_id: DataTypes.INTEGER(10),
        orginal_tweet_user_id: DataTypes.INTEGER(10),
    });


    Tweet.associate = function (models) {
        models.Tweet.hasOne(models.User, {
            foreignKey: 'twitter_id', targetKey: 'user_tweet_id', as: "user"
        });
    };

    return Tweet;
};