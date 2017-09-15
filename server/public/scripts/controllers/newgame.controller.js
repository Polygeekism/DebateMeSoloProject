myApp.controller('NewGameController', ['UserService', 'GameService', '$routeParams', function (UserService, GameService, $routeParams) {
    //console.log('NewGameController created');
    var self = this;

    self.allUsers = UserService.allUsers;
    self.userObject = UserService.userObject;
    self.allGames = GameService.allGames;
    self.newGamesOptions = UserService.newGamesOptions;
    self.currentGame = GameService.currentGame;
    self.usersGames = GameService.usersGames;

    
    //need to bring in list of all users
    UserService.getAllUsers();
    console.log('all games list, ', self.allUsers,'new game options', self.newGamesOptions)

    console.log('user opponent: ', self.userObject.opponents.length)


    //need to handle clicks for new scoreboard
    self.startNewGame = function (userName, opponentName) {
        console.log('UserName: ', userName, 'OpponentName: ', opponentName);
        GameService.createGame(userName, opponentName);

        //window.location = "#/game";
    }
}]);