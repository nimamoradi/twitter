'use strict';


module.exports = (sequelize, DataTypes) => {
    const userRelation = sequelize.define('user_relation', {
        user_source_id: DataTypes.CHAR(64),
        user_destination_id: DataTypes.CHAR(64),
        user_twitter_id: DataTypes.CHAR(64),
    });


    return userRelation;
};