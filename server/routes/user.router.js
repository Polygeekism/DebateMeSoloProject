var express = require('express');
var router = express.Router();
var Users = require('../models/user.js')

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username,
      totalWins: req.user.totalWins,
      totalDebates: req.user.totalDebates
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

router.get('/allusers', function(req, res){
  Users.find({}, function(err,data){
    if(err){
      console.log('find users error', err)
      res.sendStatus(500);
    } else {
      console.log('received users', data);
      res.send(data);
    }
  });

});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
