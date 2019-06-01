// Here we interact with the database, given an html route...

var db = require("../models");
var SpotifyAPI = require('./spotify');

module.exports = function(app) {

  //--------   USERS ROUTES   --------
  // GET all users...
  app.get('/api/users', (req, res) => {
    db.Users.findAll({}).then((dbUsers) => {
      res.json(dbUsers);
    });
  });

  // Get a User...
  app.post('/api/users/auth', (req, res) => {
    // console.log(req.body);
    db.Users.findOne({
      where: {
        user_name: req.body.user_name,
        user_password: req.body.user_password
      },
      include: [db.Posts]
    }).then((dbUser) => {
      console.log(dbUser);
      res.json(dbUser);
    });
  });

  // POST a new user...
  app.post('/api/users', (req, res) => {
    db.Users.create(req.body).then((dbUser) => {
      res.json(dbUser);
    });
  });

  // DELETE a user...
  app.delete('/api/users/:id', (req, res) => {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbUser) => {
      res.json(dbUser);
    });
  });
  //--------   /USERS ROUTES   --------

  //--------   POSTS ROUTES   --------
  // GET all posts...
  app.get('/api/posts', (req, res) => {
    db.Posts.findAll({}).then((dbPosts) => {
      res.json(dbPosts);
    });
  });

  // GET specific posts...
  app.post('/api/posts/', (req, res) => {
    db.Posts.findAll({
      where: {
        artist_name: req.body.artist_name,
        song_name: req.body.song_name
      }
    }).then((dbPosts) => {
      res.json(dbPosts);
    });
  });

  // POST a new post...
  app.post('/api/posts', (req, res) => {
    app.Posts.create(req.body).then((dbPost) => {
      res.json(dbPost);
    });
  });

  // DELETE a post...
  app.delete('/api/posts/:id', (req, res) => {
    db.Posts.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbPost) => {
      res.json(dbPost);
    });
  });
  //--------   /POSTS ROUTES   --------


  //--------   SPOTIFY ROUTES   --------

  // SEARCH BY ARTIST...
  app.get('/api/spotify/artists/:artistname', (req, res) => {
    SpotifyAPI.searchSong(req.params.artistname).then(result => {
      let tracks = result.tracks.items

      let tracks_data = tracks.map( (track) => {
        return {
          album_title: track.album.name,
          album_image: track.album.images[0].url,
          artists: track.artists[0].name,
          song_title: track.name,
          preview: track.preview_url,
          time: track.duration_ms
        }
      });

      res.send(tracks_data);
    });
  });

  // SEARCH BY ALBUM...
  app.get('/api/spotify/albums/:albumname', (req, res) => {
    SpotifyAPI.searchAlbum(req.params.albumname).then(result => {
      console.log(result.albums.items);
    });
  });
  
  //--------   /SPOTIFY ROUTES   --------
};
