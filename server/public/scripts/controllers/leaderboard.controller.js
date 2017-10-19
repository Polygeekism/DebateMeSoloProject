myApp.controller('LeaderboardController', ['UserService', function(UserService){
    console.log('LeaderBoard controller loaded');
    var self = this;

    self.allUsers = UserService.allUsers;

    UserService.getAllUsers();
}])