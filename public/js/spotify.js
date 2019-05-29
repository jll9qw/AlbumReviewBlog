function SpotifyAPI(userQuery) {
  //Read and set any environment variables with the dotenv package
  //import key.js file
  require("dotenv").config();
  var keys = require("./keys.js");
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify(keys.spotify);
  var fs = require("fs");



  if (userQuery.length > 0) {
    searchSong(userQuery.join(" "));
  }
  function searchSong(song) {


    spotify.search({ type: "track", query: song, limit: "3" }, function(
      err,
      data
    ) {
      if (err) {
        fs.appendFile("log.txt", `${now}: Error occured: ${err}`, function(
          err
        ) {
          if (err) {
            return console.log(error("Error occurred: " + err));
          }
        });
        return console.log(error("Error occurred: " + err));

        var searchedSong = `Spotify search: ${data.tracks.items[0].name}, ${
            data.tracks.items[0].artists[0].name
          }, ${data.tracks.items[0].album.name}, ${data.tracks.items[0].href} \n`;
          fs.appendFile("log.txt", `${now}: ${searchedSong}`, function(err) {
            if (err) {
              return console.log(error("Error occurred: " + err));
            }
          });
      }
    }
    }
}

module.exports = SpotifyAPI;