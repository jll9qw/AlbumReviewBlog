module.exports = (sequelize, DataTypes) => {
        let Users = sequelize.define('Users', {
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    //isAlphanumeric: true
                    len: [3, 15]
                }
            },
            user_email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },
            user_password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [6, 15]
                }
            },
            user_avatar: {
                type: DataTypes.STRING,
                validate: {
                    isUrl: true
                }
            }
        });

        Users.associate = (models) => {
            Users.hasMany(models.Posts, {
                onDelete: "cascade"
            });
        };

        return Users;
    };