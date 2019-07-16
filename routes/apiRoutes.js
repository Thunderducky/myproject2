var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
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

  app.get("/api/notes/mine", isAuthenticated, function(req, res){
    db.Note.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(dbNotes){
      res.json(dbNotes);
    });
  });

  app.post("/api/notes", isAuthenticated, function(req, res){
    db.Note.create({
      UserId: req.user.id
    }).then(function(){
      res.json(true);
    });
  });

  app.delete("/api/notes/:id", isAuthenticated, function(req, res){
    db.Note.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbNote){
      if(!dbNote){
        res.status(404).json(false);
      }
      else if(dbNote.UserId === req.user.id){
        dbNote.destroy().then(function(){
          res.status(200).json(true);
        });
      } else {
        res.status(401).json(false);
      }

    });
    // db.Note.destroy({
    //   where: {
    //     id: req.params.id,
    //     UserId: req.user.id
    //   }
    // }).then(function(dbNote){
    //   res.json(dbNote);
    // });
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
    res.json(req.user);
  });

  app.get("/api/users", function(req, res){
    db.User.findAll({}).then(function(dbUser){
      res.json(dbUser);
    });
  });
};
