'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: DataTypes.CHAR(15),
        twitter_id: DataTypes.INTEGER(10),
        bio: DataTypes.CHAR(160),
        role: DataTypes.INTEGER(1),
        bio_hastag: DataTypes.CHAR(160),


    });
    //example usage
    // uuid: {
    //     type: DataTypes.UUID,
    //     defaultValue: function() {
    //       return generateMyId()
    //     },
    //     primaryKey: true
    //   }

    User.associate = function (models) {
        models.User.hasMany(models.Task);
    };
    User.associate = function (models) {
        models.User.hasMany(models.user_relation, {
            foreignKey: 'user_destination_id', targetKey: 'twitter_id', as: "followers"
        });

        models.User.hasMany(models.user_relation, {//peeple whom i f
            foreignKey: 'user_source_id', targetKey: 'twitter_id', as: "followings"
        });
    };


    return User;
};