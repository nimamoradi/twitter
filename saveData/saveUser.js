const user = require("../models/user");
const models = require('../models/index');

module.exports = function (use) {
    let newUser = {};
    newUser.remote_user_id = use.id_str;
    newUser.username = use.screen_name;
    newUser.bio = use.description;
    newUser.role = 0;
    newUser.verified = use.verified;
    newUser.tweet_count = use.statuses_count;
    newUser.followers_count = use.followers_count;
    newUser.friends_count = use.friends_count;
    let hastags = "";
    newUser.createdAt = new Date(use.created_at);
    newUser.bio_hastag = hastags;
    models.User.findOrCreate({
        where:
            {'remote_user_id': use.id_str},
        defaults: newUser
    }).spread(function (result) {
        var author = result[0], // the instance of the author
            created = result[1]; // boolean stating if it was created or not
    });

    return newUser;
};

