'use strict';


module.exports = (sequelize, DataTypes) => {
    var userRelation = sequelize.define('user_relation', {
        user_source_id: DataTypes.INTEGER(10),
        user_destination_id: DataTypes.INTEGER(10),
        user_twitter_id: DataTypes.INTEGER(10),
    });


    userRelation.associate = function (models) {
        models.user_relation.belongsTo(models.User, {
            foreignKey: 'twitter_id', targetKey: 'user_destination_id',
        });
    };

    return userRelation;
};