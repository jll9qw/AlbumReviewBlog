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

  // Get a User for Log in...
  app.post('/api/users/auth', (req, res) => {
    console.log(req.body);
    db.Users.findOne({
      where: req.body
      ,
      include: [db.Posts]
    }).then((dbUser) => {
      console.log(dbUser);
      if (dbUser === null) {
        res.json(`Log in credentials invalid.`);
      }
      else {
        res.json(dbUser)
      }
    }).catch( err => {
      console.log(err);
      // console.log(err.errors[0].message);
      // let message = err.errors[0].message;
      // res.json(message);
    });
  });

  // POST a new user...
  app.post('/api/users', (req, res) => {
    db.Users
        // first check to see if the user already exists...
        .findOrCreate({
          where: {
            user_name: req.body.user_name,
          },
          defaults: {
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_avatar: req.body.user_avatar
          }
        })
        .then( ([user, created]) => {
          // console.log(user.get({plain:true}));
          if (created) {
            res.json(user);
          }
          else {
            res.send('The information you submitted is associated with an existing account!');
          }
        })
        .catch( err => {
          // let message = err.errors[0].message;
          let message = `${err.errors[0].type}: ${err.errors[0].message}.\n "${err.errors[0].value}" failed the ${err.errors[0].validatorKey} validation.`;
          console.log('Message sent: ', message);

          res.json(message);
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
      // console.log(dbPosts[0]['_modelOptions'][0]);

      // loop through dbPosts. If any post's user_avatar === null, set it to a generic user image...
      dbPosts.forEach( (post) => {
        // console.log(post);
        if (post.user_avatar === null) {
          post.user_avatar = 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
        }
      });
      let obj = {
        meta: meta,
        data: dbPosts
      };

      res.json(obj);
    })
      .then((result) => {
        console.log('This is the result', result);
      });
  });

  // POST a new post...
  app.post('/api/posts/create', (req, res) => {
    console.log(req.body);
    db.Posts.create({
      user_id: req.body.user_id,
      user_avatar: req.body.avatar, 
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
