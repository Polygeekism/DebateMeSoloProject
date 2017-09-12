myApp.controller('NewGameController', function(UserService) {
    console.log('NewGameController created');
    var vm = this;
    vm.userService = UserService;

    //need to bring in list of all users
    UserService.getAllUsers();

    //need to handle clicks for new scoreboard
  });