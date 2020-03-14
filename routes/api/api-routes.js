// Requiring our models and passport as we've configured it
var db = require("../../models");
var passport = require("../../config/passport");
const path = require("path");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/public/index.html"));
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // GET route for getting all of the users
  app.get("/api/users/", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get route for retrieving a single user
  app.get("/api/users/:userID", function(req, res) {
    db.User.findOne({
      where: {
        userID: req.params.userID
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

//get all instruments a user plays
  app.get("/api/users/:userID/instruments", function(req, res) {
    db.User.findAll({
      where: {
        userID: req.params.userID
      }
    }).then(function(dbUser) {
      res.json(dbUser[0].instruments);
    });
  });

//get all genres a user plays
  app.get("/api/users/:userID/genres", function(req, res) {
    db.User.findAll({
      where: {
        userID: req.params.userID
      }
    }).then(function(dbUser) {
      res.json(dbUser[0].genres);
    });
  });

//get a user's skill level
  app.get("/api/users/:userID/skillLevel", function(req, res) {
    db.User.findAll({
      where: {
        userID: req.params.userID
      }
    }).then(function(dbUser) {
      res.json(dbUser[0].skillLevel);
    });
  });

//get a user's connections list
  app.get("/api/users/:userID/connections", function(req, res) {
    db.User.findAll({
      where: {
        userID: req.params.userID
      }
    }).then(function(dbUser) {
      res.json(dbUser[0].connections);
    });
  });

  // POST route for saving a new user
  app.post("/api/users", function(req, res) {
    console.log("req body", req.body);
    db.User.create(
      req.body
    ).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // DELETE route for deleting users
  //deleting a user will also delete all of their posts due to cascading delete defined in the User model
  app.delete("/api/users/:userID", function(req, res) {
    db.User.destroy({
      where: {
        userID: req.params.userID
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // PUT route for updating users information
  app.put("/api/users/:userID", function(req, res) {
    db.User.update(req.body, {
      where: {
        userID: req.body.userID
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

//get all posts for global feed
  app.get("/api/posts/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

//get a single post
  app.get("/api/posts/:postID", function(req, res) {
    db.Post.findOne({
      where: {
        postID: req.params.postID
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

//get all posts from a single user
  app.get("/api/users/:UserUserID/posts/", function(req, res) {
    db.Post.findAll({
      where: {
        UserUserID: req.params.UserUserID
      },
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

//post a post
  app.post("/api/posts/", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

//update a post
  app.put("/api/posts/", function(req, res) {
    db.Post.update(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });


};
