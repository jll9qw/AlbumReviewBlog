// Here we interact with the database, given an html route...

var db = require("../models");

module.exports = function(app) {

  //--------   USERS ROUTES   --------
  // GET all users...
  app.get('/api/users', (req, res) => {
    db.Users.findAll({}).then((dbUsers) => {
      res.json(dbUsers);
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

};
