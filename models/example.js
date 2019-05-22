module.exports = function(sequelize, DataTypes) {
  var Albums = sequelize.define("Albums", {
    album_name: DataTypes.STRING,
    artist_name: DataTypes.STRING,
    rating: DataTypes.INTEGER
  });
  return Albums;
};
