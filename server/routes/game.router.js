var express = require('express');
var router = express.Router();
var Games = require('../models/game.js');

router.get('/', function(req, res){
    console.log('game get route hit');
    res.sendStatus(200);
})

router.post('/', function(req,res){
    console.log('router post route hit');
    console.log('req.body from post route: ',req.body);
    let gameToSave = {user1:req.body.user1,
    user2:req.body.user2}

    Games.create(gameToSave, function(err, post){
        console.log('post game CreateGame');
        if(err){
            console.log('error creating game in DB');
            res.sendStatus(500);
        }else{
            console.log('successfully created game in DB');
            res.sendStatus(200);
        }
    })
    
    
})

module.exports = router;