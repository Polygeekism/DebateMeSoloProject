var express = require('express');
var router = express.Router();
var Users = require('../models/user.js')

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  //console.log('get /user route');
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    //console.log('logged in', req.user);

    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    res.sendStatus(403);
  }
});

router.get('/allusers', function (req, res) {
  if (req.isAuthenticated()) {
    Users.find({}, function (err, data) {
      if (err) {
        //console.log('find users error', err)
        res.sendStatus(500);
      } else {
        //console.log('received users', data);
        res.send(data);
      }
    });
  } else {
    console.log('not logged in');
    res.sendStatus(403);
  }

});
router.get('/newgameusers', function (req, res) {
  let opponentsArray = req.user.opponents;
  if (req.isAuthenticated()) {
    Users.find({ username: { $nin: opponentsArray } }, function (err, data) {
      if (err) {
        //console.log('find users error', err)
        res.sendStatus(500);
      } else {
        //console.log('received users', data);
        res.send(data);
      }
    })
  } else {
    console.log('not logged in');
    res.sendStatus(403);
  }
})

// clear all server session information about this user
router.get('/logout', function (req, res) {
  // Use passport's built-in method to log out the user
  ///console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

// router.get('/newgameoptions', function(req,res){


// })

router.put('/updateusergames', function (req, res) {
  //console.log('reached the user put route, ', req.body)
  if (req.isAuthenticated()) {
    Users.findOneAndUpdate({ username: req.body.user1 },
      { $push: { games: req.body.gameId, opponents: req.body.user2 } }, function (err, user) {
        //console.log('user on put route,', user)
        if (err) return handleError(err);
        // user.games.push(req.body.gameId);
        user.save(function (err) {
          if (err) {
            return handleError(err)
          };
        });
      })
    Users.findOneAndUpdate({ username: req.body.user2 },
      { $push: { games: req.body.gameId, opponents: req.body.user1 } },
      function (err, user) {
        //console.log('user on put route,', user)
        if (err) return handleError(err);

        user.save(function (err) {
          if (err) {
            return handleError(err)
          };
        });
      })
    res.sendStatus(200);
  } else {
    console.log('not logged in');
    res.sendStatus(403);
  }
})


router.put('/scoreupdate', function (req, res) {
  console.log('hit the update user route', req.body)
  if (req.isAuthenticated()) {
    Users.findOneAndUpdate({ username: req.body.user1 },
      { $inc: { totalDebates: 1 } }, function (err, user) {
        if (err) return handleError(err);

        user.save(function (err) {
          if (err) {
            return handleError(err)
          };
        });
      })
    Users.findOneAndUpdate({ username: req.body.user2 },
      { $inc: { totalDebates: 1 } },
      function (err, user) {
        if (err) return handleError(err);

        user.save(function (err) {
          if (err) {
            return handleError(err)
          };
        });
      })
    Users.findOneAndUpdate({ username: req.body.winner },
      { $inc: { totalWins: 1 } },
      function (err, user) {
        if (err) return handleError(err);
        user.save(function (err) {
          if (err) {
            return handleError(err)
          };
        });
      })

    res.sendStatus(200);
  } else {
    console.log('not logged in');
    res.sendStatus(403);
  }
})




module.exports = router;
