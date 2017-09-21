myApp.controller('ReviewController', ['GameService', 'UserService', '$routeParams', function (GameService, UserService, $routeParams) {
    console.log('Review controller Loaded');

    var self = this;
    self.userObject = UserService.userObject;
    self.gamesForReview = GameService.gamesForReview;

    self.getGamesForReview = function () {
        GameService.getGamesForReview();
        console.log('get games for review started,');
    }
    self.approveDebate = function (scoreBoardId, debateId, winner) {
        self.reviewDebate = {
            gameId: scoreBoardId,
            deabtesId: debateId
        };
        if (self.userObject.userName == winner) {
            self.reviewDebate.userScore = 'user1score';
        } else {
            self.reviewDebate.userScore = 'user2score';
        }

        console.log('approve button clicked, ', self.reviewDebate)
        GameService.approveDebate(self.reviewDebate);

    }
    self.denyDebate = function (gameId, debateId) {
        console.log('deny button clicked, ', gameId, debateId)
    }
    self.getGamesForReview();
}])