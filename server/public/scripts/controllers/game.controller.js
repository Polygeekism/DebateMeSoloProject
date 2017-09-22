myApp.controller('GameController', ['GameService', 'UserService', '$routeParams', function (GameService, UserService, $routeParams) {
    console.log('Game Controller Loaded');
    var self = this;


    self.debateInformation = {
        description: '',
        winner: ''
    };//object for updating the game document
    self.selectWinner = [];//used to populate the select dropdown
    self.displayGame = { list: [] };//display the current game

    //using the route params fetch the current game scoreboard
    self.getCurrentGame = function (gameId) {
        GameService.getGame(gameId);
        self.displayGame = GameService.displayGame;
        console.log('current game on controller, ', self.displayGame);
        self.selectWinner = GameService.selectWinner;
    }

    self.getCurrentGame($routeParams.gameId);

    self.submitDebate = function (newDebate) {
        //set a string variable for updating the correct document on server side
        if (self.displayGame.list[0].user1 == newDebate.winner) {
            newDebate.userScore = 'user1score';
        } else {
            newDebate.userScore = 'user2score';
        }
        //check to make sure the fields have values
        if (newDebate.description === '' || newDebate.winner === '') {
            window.alert("Enter description and select winner!");
        } else {
            //call the game service to update the scoreboard
            GameService.submitDebate(newDebate);
           
            
            //reset the page for another debate topic.
            self.debateInformation = {
                description: '',
                winner: ''
            };
        }
    }
}])