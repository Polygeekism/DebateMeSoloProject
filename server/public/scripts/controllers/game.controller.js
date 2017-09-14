myApp.controller('GameController',['GameService', 'UserService', '$routeParams', function(GameService, UserService, $routeParams){
    console.log('Game Controller Loaded');
    var self = this;

    self.displayGame = {list:[]};
    console.log('$routeParams', $routeParams.gameId);
    //console.log(self.currentGame);
    self.getCurrentGame = function(gameId){
        GameService.getGame(gameId);
        self.displayGame = GameService.displayGame;
        console.log('current game on controller, ',self.displayGame);

    }
    self.getCurrentGame($routeParams.gameId);

    //GameService.getGame();
    //GameService.createGame();
}])