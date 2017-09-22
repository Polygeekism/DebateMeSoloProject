myApp.controller('ReviewController', ['GameService', 'UserService', '$routeParams', function (GameService, UserService, $routeParams) {
    console.log('Review controller Loaded');

    var self = this;
    self.userObject = UserService.userObject;
    self.gamesForReview = GameService.gamesForReview;

    self.getGamesForReview = function () {
        GameService.getGamesForReview();
        console.log('get games for review started,');
    }
    self.approveDebate = function (scoreBoardId, debateId, winner,user1,user2) {
        self.reviewDebate = {
            gameId: scoreBoardId,
            debatesId: debateId,
            user1:user1,
            user2:user2,
            winner: winner
        };
        

        console.log('approve button clicked, ', self.reviewDebate)
        GameService.approveDebate(self.reviewDebate);

    }

    self.denyDebate = function (gameId, debateId) {
        console.log('deny button clicked, ', gameId, debateId)
        self.denyObject = {
            gameId: gameId,
            debatesId: debateId
        }
        GameService.denyDebate(self.denyObject);
    }
    self.getGamesForReview();
    console.log('games for review, ', self.gamesForReview);
}])