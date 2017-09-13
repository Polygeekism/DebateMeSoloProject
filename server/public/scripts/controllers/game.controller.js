myApp.controller('GameController',['GameService', 'UserService', function(GameService, UserService){
    console.log('Game Controller Loaded');
    GameService.getGames();
}])