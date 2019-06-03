// Here we interact with the database, given an html route...

var db = require("../models");
var SpotifyAPI = require('./spotify');
var moment = require('moment');


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
    let meta = req.body;
    db.Posts.findAll({
      where: {
        artist_name: req.body.artists,
        song_name: req.body.song,
        album_name: req.body.album
      }
    }).then((dbPosts) => {
      let obj = {
        meta: meta,
        data: dbPosts
      };
      res.json(obj);
    });
  });

  // POST a new post...
  app.post('/api/posts/create', (req, res) => {
    console.log(req.body);
    db.Posts.create({
      UserId: req.body.UserId, 
      album_name: req.body.album, 
      artist_name: req.body.artist, 
      song_name: req.body.song, 
      body: req.body.body, 
      rating: req.body.rating
    }).then((dbPost) => {
      // res.json(dbPost);
      res.send(dbPost);
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
          // moment.duration('23:59:59');
          // moment("1234", "hmm").format("HH:mm") 
          time: moment(track.duration_ms).format('mm:ss')
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
