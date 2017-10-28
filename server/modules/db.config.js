var mongoose = require('mongoose');

// Mongo Connection //
var databaseURI = '';
// process.env.MONGODB_URI will only be defined if you 
// are running on Heroku
if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    databaseURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    databaseURI = 'mongodb://localhost:27017/debateMe';
}


// var mongoURI = "mongodb://localhost:27017/passport";
var mongoDB = mongoose.connect(databaseURI).connection;

mongoDB.on('error', function(err){
   if(err) {
     console.log("MONGO ERROR: ", err);
   }
   res.sendStatus(500);
});

mongoDB.once('open', function(){
   console.log("Connected to Mongo!");
});

module.exports = mongoDB;
