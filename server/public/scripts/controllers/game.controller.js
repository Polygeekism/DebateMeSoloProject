myApp.controller('GameController',['GameService', 'UserService', function(GameService, UserService){
    console.log('Game Controller Loaded');
    var self = this;

    GameService.getGames();
    //GameService.createGame();
}])