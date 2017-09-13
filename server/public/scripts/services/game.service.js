myApp.service('GameService', function($http, $location){
    console.log('Game Service Created');
    var self = this;

    self.currentGame = {};
    self.usersGames = {list:[]};

    self.getGames = function(){
        $http.get('/game').then(function(reponse){
            console.log('Got response from Game Get route');
        })
    }
    self.getGames();
})