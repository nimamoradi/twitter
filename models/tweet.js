'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tweets = sequelize.define('Tweets', {
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
        in_reply_to_user_id_str: DataTypes.CHAR(64),
        is_reply:DataTypes.BOOLEAN
    });

    //
    // Tweets.associate = function (models) {
    //     Tweets.hasOne(models.User, {
    //         foreignKey: 'remote_user_id', targetKey: 'remote_user_tweeted', as: "user"
    //     });
    // };

    return Tweets;
};