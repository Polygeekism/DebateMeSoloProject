myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;

  self.userObject = {};
  self.allUsers = { list: [] };

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data) {
        //console.log('whole response from server: ', response.data)
        // user has a curret session on the server
        //self.userObject.id = response.data._id;
        self.userObject.userName = response.data.username;
        self.userObject.totalWins = response.data.totalWins;
        self.userObject.totalDebates = response.data.totalDebates;
        self.userObject.winPercentage = (response.data.totalWins / response.data.totalDebates) * 100;
        //console.log('UserService -- getuser -- User Data: ', self.userObject);
      } else {
        //console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      //console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },
    self.getAllUsers = function () {
      console.log('UserService -- getAllUsers');
      $http.get('/user/allusers').then(function (response) {
        if (response.data) {
          //console.log('returned from the server getallusers route', response.data);
          self.allUsers.list = response.data;
          for (i = 0; i < self.allUsers.list.length; i++) {
            self.allUsers.list[i].winPercentage = (self.allUsers.list[i].totalWins) / (self.allUsers.list[i].totalDebates) * 100;
          }
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

});
