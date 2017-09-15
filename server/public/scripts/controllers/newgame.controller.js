myApp.controller('NewGameController', ['UserService', 'GameService', '$routeParams', function (UserService, GameService, $routeParams) {
    //console.log('NewGameController created');
    var self = this;

    self.allUsers = UserService.allUsers;
    self.userObject = UserService.userObject;
    self.allGames = GameService.allGames;
    self.newGamesOptions = {list:[]};
    self.currentGame = GameService.currentGame;
    self.usersGames = GameService.usersGames;

    //need to bring in list of all users
    UserService.getAllUsers();
    

    self.newGameOptions = function(){
        UserService.getAllUsers();
        let games = self.usersGames;
        let users = self.allUsers;
        console.log('users, ', users[0])
        for(var i=0; i<games.list.length; i++){
            for(var j=0; j<users.length; j++){
                if(users[j].username != games.list[i].opponentName){
                    self.newGamesOptions.list.push(users.list[j]);
                }
            }
        }
        console.log('new game option list, ', self.newGamesOptions)
    }
    self.newGameOptions();

    //need to handle clicks for new scoreboard
    self.startNewGame = function (userName, opponentName) {
        console.log('UserName: ', userName, 'OpponentName: ', opponentName);
        GameService.createGame(userName, opponentName);

        //window.location = "#/game";
    }
}]);