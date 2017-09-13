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
        let users = {user1:user1, user2:user2}
        $http.post('/game', users).then(function(response){
            console.log('Got response from Game Post route');
        })
    }
})