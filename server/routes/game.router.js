var express = require('express');
var router = express.Router();
var Games = require('../models/game.js');


router.get('/gameId/:id', function (req, res) {
    let gameId = req.params.id
    console.log('game get route hit,gameId ', gameId);
    Games.find({ _id: gameId }, function (err, data) {
        if (err) {
            console.log('find game error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found data from game', data);
            res.send(data);
        }
    })
})

router.get('/allgames', function(req,res){
    if (req.isAuthenticated()){
        Games.find({},function(err,data){
            if (err) {
                console.log('find allgames error: ', err);
                res.sendStatus(500);
            } else {
                console.log('found data from allgames', data);
                res.send(data);
            }
        })
    }
})

router.get('/usergames', function (req, res) {
    console.log('usergames get route hit');
    //let userId = id;
    if (req.isAuthenticated()) {
        var userInfo = {
            user1: req.user.username
        }

        Games.find({ $or: [{ user1: req.user.username }, { user2: req.user.username }] }, function (err, data) {
            if (err) {
                console.log('find usersgames error: ', err);
                res.sendStatus(500);
            } else {
                console.log('found data from usersgames', data);
                res.send(data);
            }

        })
    }
})

router.post('/', function (req, res) {
    console.log('router post route hit');
    console.log('req.body from post route: ', req.body);
    let gameToSave = {
        user1: req.body.user1,
        user2: req.body.user2
    }

    Games.create(gameToSave, function (err, post) {
        console.log('post game CreateGame response, ', post);
        if (err) {
            console.log('error creating game in DB');
            res.sendStatus(500);
        } else {
            //post response above is the game that was created
            console.log('successfully created game in DB');
            Games.find({
                $and: [{ user1: req.body.user1 }, { user2: req.body.user2 }]
            }, function (err, data) {
                if (err) {
                    console.log('find user error: ', err);
                    res.sendStatus(500);
                } else {
                    console.log('found data from GET', data);
                    res.send(data);
                }
            }
            );
        }
    })
})

module.exports = router;