'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
            username: DataTypes.CHAR(15),
            remote_user_id: DataTypes.CHAR(64),
            bio: DataTypes.CHAR(160),
            role: DataTypes.INTEGER(1),
            bio_hastag: DataTypes.CHAR(160),
            followers_count: DataTypes.CHAR(64),
            friends_count: DataTypes.CHAR(64),
            verified: {type: DataTypes.BOOLEAN, defaultValue: false}
        }, {
            instanceMethods:
                {
                    getHastags: function () {
                        return ("hi Hastags")
                    }

                }

        }
        )
    ;

    User.associate = function (models) {
        models.User.hasMany(models.user_relation, {
            foreignKey: 'user_destination_id', targetKey: 'remote_user_id', as: "followers"
        });

        models.User.hasMany(models.user_relation, {//people whom i f
            foreignKey: 'user_source_id', targetKey: 'remote_user_id', as: "followings"
        });
    };


    return User;
}
;