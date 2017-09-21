myApp.controller('InfoController',['UserService', function(UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
}]);
