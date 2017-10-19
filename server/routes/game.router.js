var express = require('express');
var router = express.Router();
var Games = require('../models/game.js');


router.get('/gameId/:id', function (req, res) {
    let gameId = req.params.id
    if (req.isAuthenticated()) {
        //console.log('game get route hit,gameId ', gameId);
        Games.find({ _id: gameId }, function (err, data) {
            if (err) {
                //console.log('find game error: ', err);
                res.sendStatus(500);
            } else {
                //console.log('found data from game', data);
                res.send(data);
            }
        })
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
})

router.get('/allgames', function (req, res) {
    if (req.isAuthenticated()) {
        Games.find({}, function (err, data) {
            if (err) {
                // console.log('find allgames error: ', err);
                res.sendStatus(500);
            } else {
                //console.log('found data from allgames', data);
                res.send(data);
            }
        })
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
})

router.get('/usergames', function (req, res) {
    //console.log('usergames get route hit');
    //let userId = id;
    if (req.isAuthenticated()) {
        var userInfo = {
            user1: req.user.username
        }

        Games.find({ $or: [{ user1: req.user.username }, { user2: req.user.username }] }, function (err, data) {
            if (err) {
                //console.log('find usersgames error: ', err);
                res.sendStatus(500);
            } else {
                //console.log('found data from usersgames', data);
                res.send(data);
            }

        })
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
})

router.get('/reviewgames', function (req, res) {
    console.log('reviewgames route hit');
    if (req.isAuthenticated()) {
        let gamesArray = req.user.games;
        let currentUser = [req.user.username];
        // let reviewArray = [];
        Games.find({

            _id: { $in: gamesArray },
            'debates.pending': true

        },
            function (err, data) {

                console.log(data);
                res.send(data);
            })
        //{'tags.text': {$in: tagTexts}}
        // Games.find({_id:{$in:gamesArray}}, {debates:1, _id:0}, function(err,data){
        //     console.log(data[0]);
        //     for(var i=0; i<data.length;)
        //     res.send(data);
        // })
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }

})

router.post('/', function (req, res) {
    //console.log('router post route hit');
    //console.log('req.body from post route: ', req.body);
    let gameToSave = {
        user1: req.body.user1,
        user2: req.body.user2
    }
    if (req.isAuthenticated()) {
        Games.create(gameToSave, function (err, post) {
            //console.log('post game CreateGame response, ', post);
            if (err) {
                //console.log('error creating game in DB');
                res.sendStatus(500);
            } else {
                //post response above is the game that was created
                //console.log('successfully created game in DB');
                Games.find({
                    $and: [{ user1: req.body.user1 }, { user2: req.body.user2 }]
                }, function (err, data) {
                    if (err) {
                        //console.log('find user error: ', err);
                        res.sendStatus(500);
                    } else {
                        //console.log('found data from GET', data);
                        res.send(data);
                    }
                }
                );
            }
        })
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
})
router.put('/approvedebate', function (req, res) {
    if (req.isAuthenticated()) {
        let userScore = {};
        let debateId = req.body.debatesId;
        let gameId = req.body.gameId;


        if (req.body.winner == req.body.user1) {
            userScore = {
                user1score: 1
            }
        } else {
            userScore = {
                user2score: 1
            }
        }
        Games.findByIdAndUpdate(req.body.gameId,
            {
                $inc: userScore
            },
            function (err) {

                if (err) {
                    //console.log('add new game err: ', err);
                    res.sendStatus(500);
                } else {

                    Games.findOneAndUpdate({ _id: gameId, 'debates._id': debateId },
                        {
                            $set: { 'debates.$.pending': false }
                        },
                        function (err, game) {
                            console.log('did we make it to the second command')
                            if (err) return handleError(err);
                            //console.log('add new game err: ', err);

                            game.save(function (err) {
                                if (err) {
                                    return handleError(err)
                                };
                            });

                            //console.log('debate added to game table');
                            res.sendStatus(200);

                        })

                }

            }
        )
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }

})
router.put('/newdebate', function (req, res) {
    //console.log('info from new debate route, ', req.body);

    if (req.isAuthenticated()) {
        let debate = {
            description: req.body.description,
            winner: req.body.winner,
            pending: true,
            submittedby: req.user.username
        }
        //console.log('userscore, ', userScore)

        Games.findByIdAndUpdate(
            req.body.gameId,
            {
                $push: { "debates": debate }
            }, function (err) {

                if (err) {
                    //console.log('add new game err: ', err);
                    res.sendStatus(500);
                } else {
                    //console.log('debate added to game table');
                    res.sendStatus(200);
                }

            }
        )

    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }

})

router.delete('/deletedebate', function (req, res) {
    let gameId = req.query.gameId;
    let debateId = req.query.debatesId;
    console.log('req.params ', req.query);
    if (req.isAuthenticated()) {
        //remove the debate from the array with pull. sequeance is document->$pull-> from debates objects-> where id is this.
        Games.update({ _id: gameId },
            { $pull: { debates: { 'debates._id': debateId } } },
            function (err, game) {
                console.log('made it through the findandremove')
                if (err) return handleError(err);
                res.sendStatus(200);

            })
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
})
module.exports = router;