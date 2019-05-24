DATABASE HEIRARCHY
    USERS
        -POSTS
    ALBUMS




-----------------------------------------------------
Users
    - id
    - user_name
    - user_email
    - user_password
    - user_avatar (will be a link)
    - primary key (id)

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
-----------------------------------------------------
Posts
    - id
    - body
    - createdAt
    - user_id

    module.exports = (sequelize, DataTypes) => {
        let Posts = sequelize.define('Posts', {
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: Users,
                    key: 'id'
                }
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
                len: [1, 500]
            },
            album_name: {
                type: DataTypes.STRING,
                allowNull: false,
                len: [1, 500]
            },
            artist_name: {
                type: DataTypes.STRING,
                allowNull: false,
                len: [1]
            },
            song_name: {
                type: DataTypes.STRING,
                allowNull: false,
                len: [1]
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                len: [1, 5]
            }
        });

        Posts.associate = (models) => {
            Posts.belongsTo(models.Users, {
                foreignKey: {
                    allowNull: false
                }
            });
        };

        return Posts;
    };
-----------------------------------------------------
Albums
    - album_name
    - artist_name
    - rating

