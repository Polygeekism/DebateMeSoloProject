myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  // vm.winPercentage = ((vm.userObject.totalWins)/(vm.userObject.totalDebates))* 100;
  //console.log('Userobject from controller ', vm.userObject);
  //console.log('Win % from controller ', vm.userObject.winPercentage);
});
