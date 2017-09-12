myApp.controller('NewGameController', function(UserService) {
    console.log('NewGameController created');
    var self = this;
    
    self.allUsers = UserService.allUsers;

    //need to bring in list of all users
    UserService.getAllUsers();

    //need to handle clicks for new scoreboard
  });