require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
// get access keys...
const spotify = new Spotify(keys.spotify);
// {
//   id: '86607118b5b14e10a229727f37dfa74d',
//   secret: '91250faee20949bf907436c23565baad'
// }

// set up spotify object...
const SpotifyAPI = {
  // method for searching songs...
  searchSong: function (song) {
    return spotify.search({ type: "track", query: song, limit: "8" });
  }
};
  
module.exports = SpotifyAPI;