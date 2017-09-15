myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;

  self.userObject = {};
  self.allUsers = { list: [] };
  self.newGamesOptions = { list: [] };

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data) {
        //console.log('whole response from server: ', response.data)
        // user has a curret session on the server
        self.userObject.id = response.data._id;
        self.userObject.userName = response.data.username;
        self.userObject.totalWins = response.data.totalWins;
        self.userObject.totalDebates = response.data.totalDebates;
        self.userObject.games = response.data.games;
        self.userObject.opponents = response.data.opponents;
        self.userObject.winPercentage = (response.data.totalWins / response.data.totalDebates) * 100;
        console.log('UserService -- getuser -- User Data: ', self.userObject);
      } else {
        //console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      //console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  }
  self.getAllUsers = function () {
    console.log('UserService -- getAllUsers');
    $http.get('/user/allusers').then(function (response) {
      if (response.data) {
        //console.log('returned from the server getallusers route', response.data);
        self.allUsers.list = response.data;
        for (i = 0; i < self.allUsers.list.length; i++) {
          self.allUsers.list[i].winPercentage = (self.allUsers.list[i].totalWins) / (self.allUsers.list[i].totalDebates) * 100;
          self.allUsers.list[i].show = true;
        }
        let users = self.allUsers;
        console.log('users: ', users);
        for (var i = 0; i < self.userObject.opponents.length; i++) {
          console.log('made it through the first for, ', self.userObject.opponents[0])
          for (var j = 0; j < users.list.length; j++) {
            console.log('user in loop, ', users.list[i].username)
            if (users.list[j].username == self.userObject.opponents[i]) {
              users.list[j].show = false;
            }

          }
        }
        self.newGamesOptions.list = users.list;
        console.log('new games options, ', self.newGamesOptions)

      } else {
        //console.log('UserService get all users failure');
        $location.path("/home");

      }
    })
  }

  self.logout = function () {
    //console.log('UserService -- logout');
    $http.get('/user/logout').then(function (response) {
      //console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
  self.updateUserGames = function (user1, user2, gameId) {
    let updateSet = { user1: user1, user2: user2, gameId: gameId };
    $http.put('/user/updateusergames/', updateSet).then(function (response) {
      console.log('User game lists updated, ', response);
    })
  }
  self.getNewGameOptions = function () { }

});
