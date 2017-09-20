myApp.controller('UserController', ['UserService', 'GameService', '$routeParams', function (UserService, GameService, $routeParams) {
  console.log('UserController created');
  var self = this;

  self.userObject = UserService.userObject;//store the current users information


  //get just this users games by Id
  self.getUsersGames = function () {
    GameService.getUsersGames();
    self.usersGames = GameService.usersGames;

    console.log('users games, ', self.usersGames);
  }

  //get users games on view load
  self.getUsersGames();

}]);
