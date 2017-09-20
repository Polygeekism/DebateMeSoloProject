myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;

  self.userObject = {};//current logged in user
  self.allUsers = { list: [] };//list of all users in the system
  self.newGamesOptions = { list: [] };//modified list of users that only includes users who the user does not already have a game with

  self.getuser = function () {
    //console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data) {
    
        // user has a curret session on the server
        self.userObject.id = response.data._id;
        self.userObject.userName = response.data.username;
        self.userObject.totalWins = response.data.totalWins;
        self.userObject.totalDebates = response.data.totalDebates;
        self.userObject.games = response.data.games;
        self.userObject.opponents = response.data.opponents;
        //calculating a win percentage based on total debates and total wins
        self.userObject.winPercentage = (response.data.totalWins / response.data.totalDebates) * 100;
        
      } else {
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
     
      $location.path("/home");
    });
  }
  self.getAllUsers = function () {
    
    $http.get('/user/allusers').then(function (response) {
      if (response.data) {
        
        self.allUsers.list = response.data;
        //when all users returned, add the win percentage and a boolean to determine if they should be shown
        for (i = 0; i < self.allUsers.list.length; i++) {
          self.allUsers.list[i].winPercentage = (self.allUsers.list[i].totalWins) / (self.allUsers.list[i].totalDebates) * 100;
          self.allUsers.list[i].show = true;
        }
        let users = self.allUsers;
        
        // //for each of the opponents in the array for the logged in user
        // for (var i = 0; i < self.userObject.opponents.length; i++) {
          
        //   //loop through the list of all users
        //   for (var j = 0; j < users.list.length; j++) {
        //     //and test to see if they are on the users oppnents list. if they are change show to false
        //     if (users.list[j].username == self.userObject.opponents[i]) {
        //       users.list[j].show = false;
        //     }

        //   }
        // }
        // //better way to do it on the server side..

        // //let opponentsArray = req.user.opponents;
        // //User.find{username:{$nin:opponentsArray}} <-should return list of users not in opponents array
        // //set the new games options to the list of filtered users
        // self.newGamesOptions.list = users.list;
        

      } else {
        //console.log('UserService get all users failure');
        $location.path("/home");

      }
    })
  }

  self.getNewGameUsers = function(){
    $http.get('/user/newgameusers').then(function(response){
      console.log('response from newgame users route, ', response);
      self.newGamesOptions.list =response.data
      console.log('new game options, ',self.newGamesOptions.list);
    })
  }

  self.logout = function () {
    //console.log('UserService -- logout');
    $http.get('/user/logout').then(function (response) {
      //console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  //add games to users array of scoreboards
  self.updateUserGames = function (user1, user2, gameId) {
    let updateSet = { user1: user1, user2: user2, gameId: gameId };
    $http.put('/user/updateusergames/', updateSet).then(function (response) {
      
    })
  }

  //update both users total debates and the winner
  self.scoreUpdate = function(user1, user2, winner){
    let scoreUpdate = {user1:user1, user2:user2, winner:winner};
    //console.log('score update service route hit', scoreUpdate);
    $http.put('/user/scoreupdate/', scoreUpdate).then(function(response){
      //console.log('score update route complete');
    })
  }

});
