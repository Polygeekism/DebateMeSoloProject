myApp.controller('GameController',['GameService', 'UserService', '$routeParams', function(GameService, UserService, $routeParams){
    console.log('Game Controller Loaded');
    var self = this;

    self.debateInformation = {description: '',
    winner: ''};
    self.selectWinner = [];
    self.displayGame = {list:[]};

    console.log('$routeParams', $routeParams.gameId);
    //console.log(self.currentGame);
    self.getCurrentGame = function(gameId){
        GameService.getGame(gameId);
        self.displayGame = GameService.displayGame;
        console.log('current game on controller, ',self.displayGame);
        self.selectWinner = GameService.selectWinner;


    }
    self.getCurrentGame($routeParams.gameId);

    self.submitDebate = function(newDebate){
        if(newDebate.description === '' || newDebate.winner === '') {
            window.alert("Enter description and select winner!");
          }else{
              console.log('debate information passed into controller');
          }
    }

    //GameService.getGame();
    //GameService.createGame();
}])