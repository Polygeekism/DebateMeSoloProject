myApp.controller('ReviewController', ['GameService', 'UserService', '$routeParams', function (GameService, UserService, $routeParams) {
    console.log('Review controller Loaded');

    var self = this;
    self.userObject = UserService.userObject;
    self.gamesForReview = GameService.gamesForReview;

    self.getGamesForReview = function(){
        GameService.getGamesForReview();
        console.log('get games for review started');
    }
    self.getGamesForReview();
}])