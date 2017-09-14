myApp.controller('GameController',['GameService', 'UserService', '$routeParams', function(GameService, UserService, $routeParams){
    console.log('Game Controller Loaded');
    var self = this;

    self.currentGame = GameService.currentGame;
    console.log(self.currentGame);
    //GameService.getGame();
    //GameService.createGame();
}])