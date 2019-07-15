var db = require("../models");
var passport = require("../config/passport");
module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/register", function(req, res){
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });
  app.post("/api/login", passport.authenticate("local"), function(req, res){
    // db.User.findOne({
    //   where: {
    //     email: req.body.email
    //   }
    // }).then(function(dbUser){
    //   if(dbUser){
    //     if(dbUser.validPassword(req.body.password)){
    //       res.json(dbUser);
    //     } else {
    //       res.status(401).send("Nope");
    //     }
    //   }
    //
    // })
    res.json(req.user);
  });

  app.get("/api/users", function(req, res){
    db.User.findAll({}).then(function(dbUser){
      res.json(dbUser);
    });
  });
};
