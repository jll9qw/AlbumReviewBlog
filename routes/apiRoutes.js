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

  app.get('/api/spotify/artists/:artistname', (req, res) => {
    SpotifyAPI.searchSong(req.params.artistname).then(result => {
      res.send(result.tracks.items);
    });
  });

  
  //--------   /SPOTIFY ROUTES   --------
};
