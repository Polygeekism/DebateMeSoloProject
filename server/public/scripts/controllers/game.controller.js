myApp.controller('GameController',['GameService', 'UserService', '$routeParams', function(GameService, UserService, $routeParams){
    console.log('Game Controller Loaded');
    var self = this;

    self.currentGame = {};
    console.log('$routeParams', $routeParams.gameId);
    //console.log(self.currentGame);
    self.getCurrentGame = function(gameId){
        GameService.getGame(gameId);
        self.currentGame = GameService.currentGame;

    }
    self.getCurrentGame($routeParams.gameId);
    //GameService.getGame();
    //GameService.createGame();
}])