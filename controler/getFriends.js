const user = require("../models/user");
const models = require('../models/index');

module.exports = function (use) {

    console.log('use ' + use);
    for (let i = 0; i < use.ids.length; i++) {


        models.user_relation.findOrCreate({
            where:
                {
                    'user_source_id': use.sourceID,
                    'user_destination_id': use.ids[i],
                },
            defaults: {
                'user_source_id': use.sourceID,
                'user_destination_id': use.ids[i],
                'user_twitter_id': use.ids[i],
            }
        }).spread(function (result) {
            // let author = result[0], // the instance of the author
            //     created = result[1]; // boolean stating if it was created or not
        });
    }

};

