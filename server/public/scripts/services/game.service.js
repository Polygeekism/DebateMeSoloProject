myApp.service('GameService', function($http, $location){
    console.log('Game Service Created');
    var self = this;

    self.currentGame = {list:[]};
    self.usersGames = {list:[]};
    self.displayGame = {list:[]};
    self.allGames = {list:[]};
    

    self.getGame = function(gameId){
        $http.get('/game/gameId/'+ gameId).then(function(response){
            console.log('Got response from Game Get route, ', response.data);
            self.displayGame.list = response.data;
        })
    }

    //self.getGameDetail = function(){};
    self.getUsersGames = function(){
        //console.log('userId on game service: ', userId);
        $http.get('/game/usergames').then(function(response){
            
            self.usersGames.list = response.data;
            console.log('Got response from getUsersGames: ', self.usersGames);
        })
    }

    self.getAllGames = function(){
        $http.get('/game/allgames').then(function(response){
            self.allGames.list = response.data;
        })
    }
    
    self.createGame = function(user1, user2){
        let users = {user1:user1, user2:user2}
        $http.post('/game', users).then(function(response){
            console.log('Got response from Game Post route: ', response.data);
            self.currentGame.list = response.data;
            console.log('current game on service, ', self.currentGame.list[0]._id);
            window.location = '#/game/'+ self.currentGame.list[0]._id;
        })
    }
    self.getAllGames();
})