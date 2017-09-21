myApp.controller('ReviewController', ['GameService', 'UserService', '$routeParams', function (GameService, UserService, $routeParams) {
    console.log('Review controller Loaded');

    var self = this;
    self.userObject = UserService.userObject;
    self.gamesForReview = GameService.gamesForReview;

    self.getGamesForReview = function(){
        GameService.getGamesForReview();
        console.log('get games for review started,' );
    }
    self.approveGame = function(gameId){
        console.log('approve button clicked, ', gameId)

    }
    self.denyGame = function(gameId, debateId){
        console.log('deny button clicked, ', gameId, debateId)
    }
    self.getGamesForReview();
}])