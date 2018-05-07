var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Session = mongoose.model('Session');
var SessionService = require('../services/sessions.js');

/* Log in user */
router.post('/login', function(req, res) {
  //Find a user with the username requested. Select salt and password
  User.findOne({  //mongoose defined method for user model
      username: req.body.username.toLowerCase() //like SQL WHERE statement to search by parameters
  })
    .select('password salt')  //space seperated (2 parameters here)
    .exec(function(err, user) {  //ends the .chain of methods
      if (err) {
        res.status(500).json({  //sent from server to client
          msg: "Couldn't search the database for user!"
        });
      } else if (!user) {
        res.status(401).json({
          msg: "Wrong email!"
        });
      } else {
        //Hash the requested password and salt
        var hash = crypto.pbkdf2Sync(req.body.password, user.salt, 10000, 512, 'sha512').toString('base64');
        //Compare to stored hash
        if (hash == user.password) {
          SessionService.generateSession(user._id, function(token){
            //All good, give the user their token
            res.status(200).json({
              token: token
            });
          }, function(err){
            res.status(err.status).json(err);
          });
        } else {
          res.status(401).json({
            msg: "Password is incorrect!"
          });
        }
      }
    });
});

/* Join as a user */
router.post('/join', function(req, res, next) {
  var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
  if (!emailRegex.test(req.body.username)) {
    res.status(412).json({
      msg: "Email is not valid!"
    });
  } else {
    //Check if a user with that username already exists
    User.findOne({
        username: req.body.username.toLowerCase()
      })
      .select('_id')
      .exec(function(err, user) {
        if (user) {
          res.status(406).json({
            msg: "Email taken!"
          });
        } else {
          //Create a random salt
          var salt = crypto.randomBytes(128).toString('base64');
          //Create a unique hash from the provided password and salt
          var hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('base64');
          //Create a new user with the assembled information
          new User({
            username: req.body.username.toLowerCase(),
            screenname: req.body.screenname,
            password: hash,
            salt: salt
          }).save(function(err, newUser) {
            if (err) {
              console.log("Error saving user to DB!");
              res.status(500).json({
                msg: "Error saving user to DB!"
              });
            } else {
              SessionService.generateSession(newUser._id, function(token){
                //All good, give the user their token
                res.status(200).json({
                  token: token
                });
              }, function(err){
                res.status(err.status).json(err);
              });
            }
          });
        }
      });
  }
});

/* Update user */
router.put('/', function(req, res, next) {
  var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
  if (req.body.username && !emailRegex.test(req.body.username)) {
    res.status(412).json({
      msg: "Email is not valid!"
    });
  } else {
    SessionService.validateSession(req.query.token, function(user_id) {
      var updatedUser = {};

      if (req.body.username && typeof req.body.username === 'string') updatedUser.username = req.body.username;
      if (req.body.screenname && typeof req.body.screenname === 'string') updatedUser.screenname = req.body.screenname;
      if (req.body.password && typeof req.body.password === 'string') {
        //Create a random salt
        var salt = crypto.randomBytes(128).toString('base64');
        //Create a unique hash from the provided password and salt
        var hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('base64');
        updatedUser.password = hash;
        updatedUser.salt = salt;
      }

      var setUser = {
        $set: updatedUser
      }
      console.log(user_id);

      User.update({
        _id: user_id
      }, setUser)
      .exec(function(err, user) {
        if (err) {
          res.status(500).json({
            msg: "Could not update user"
          });
        } else {
          res.status(200).json(user);
        }
      });
    }, function(err) {
      res.status(err.status).json(err);
    });
  }
});

module.exports = router;
