myApp.controller('NewGameController', function (UserService) {
    //console.log('NewGameController created');
    var self = this;

    self.allUsers = UserService.allUsers;
    self.userObject = UserService.userObject;

    //need to bring in list of all users
    UserService.getAllUsers();
 
    // self.allUsersAddPercent();

    //need to handle clicks for new scoreboard
    self.startNewGame = function(userId ,opponentId){
        console.log('UserId: ',userId, 'OpponentId: ', opponentId);
        window.location ="#/game";
    }
});