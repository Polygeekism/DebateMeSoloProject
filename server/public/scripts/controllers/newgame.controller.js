myApp.controller('NewGameController', function (UserService) {
    console.log('NewGameController created');
    var self = this;

    self.allUsers = UserService.allUsers;

    //need to bring in list of all users
    UserService.getAllUsers();
    // self.allUsersAddPercent = function () {
        
    // }
    // self.allUsersAddPercent();

    //need to handle clicks for new scoreboard
    self.startNewGame = function(){
        console.log('New game button clicked');
        window.location ="#/game";
    }
});