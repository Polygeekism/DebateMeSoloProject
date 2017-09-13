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
    
    self.createGame = function(user1, user2){
        $http.post('/game').then(function(response){
            console.log('Got response from Game Post route');
        })
    }
})