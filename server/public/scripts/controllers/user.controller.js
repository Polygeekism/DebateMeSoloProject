myApp.controller('UserController', ['UserService', 'GameService', '$routeParams', function (UserService, GameService, $routeParams) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  
  //console.log('$routeParams', $routeParams.id);

  //get just this users games by Id
  self.getUsersGames = function () {
    GameService.getUsersGames();
    self.usersGames = GameService.usersGames;
    
    console.log('users games, ', self.usersGames);
  }
  //console.log('user id:', self.userObject.userName);
  self.getUsersGames();

  //dont send name with request, use passport on the server side to access the ID of the user and retrieve the name of the user that way, then finally go to the games collection to get the correct games
  
  
}]);
