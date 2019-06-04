var Users = require('./users');

module.exports = (sequelize, DataTypes) => {
        let Posts = sequelize.define('Posts', {
            // user_id: {
            //     type: DataTypes.INTEGER
            //     ,
            //     references: {
            //         model: 'Users',
            //         key: 'UserId'
            //     }
            // },
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

        // Posts.associate = (models) => {
        //     Posts.belongsTo(models.Users, {
        //         foreignKey: {
        //             allowNull: false
        //         }
        //     });
        // };

        return Posts;
    };