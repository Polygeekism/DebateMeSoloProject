var express = require('express');
var router = express.Router();
var Games = require('../models/game.js');

router.get('/', function(req, res){
    console.log('game get route hit');
    res.sendStatus(200);
})

router.post('/', function(req,res){
    console.log('router post route hit');
    res.sendStatus(200);
    
})

module.exports = router;