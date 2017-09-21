myApp.service('GameService', function ($http, $location, UserService,$routeParams) {
    console.log('Game Service Created');
    var self = this;

    
    self.usersGames = { list: [] };//all the game scoreboards the requested user is a part of
    self.displayGame = { list: [] };//game that will be displayed on game view
    //self.allGames = { list: [] };//right now this is not needed
    self.selectWinner = { list: [] }//used to populate the select dropdown
    self.gamesForReview = {list:[]};

    //get a game from database based on passed in ID
    self.getGame = function (gameId) {
        $http.get('/game/gameId/' + gameId).then(function (response) {
            self.displayGame.list = response.data;
            self.selectWinner.list = [self.displayGame.list[0].user1, self.displayGame.list[0].user2]
        })
    }

    //get all games for the logged in user. 
    self.getUsersGames = function () {
        
        $http.get('/game/usergames').then(function (response) {

            self.usersGames.list = response.data;
            console.log('Got response from getUsersGames: ', self.usersGames);
        })
    }

    self.getGamesForReview = function(){
        $http.get('/game/reviewgames').then(function(response){
            console.log('response from review games, ', response);
            //self.gamesForReview.list = response.data;
        })
    }

    // self.getAllGames = function () {
    //     $http.get('/game/allgames').then(function (response) {
    //         self.allGames.list = response.data;
    //     })
    // }

    self.createGame = function (user1, user2) {
        //create object with both users to create scoreboard on database
        let users = { user1: user1, user2: user2 }
        $http.post('/game', users).then(function (response) {
            //response is the game/scoreboard that was saved.
            self.displayGame.list = response.data;
            //navigate to the game screen with the proper routing params
            window.location = '#/game/' + self.displayGame.list[0]._id;

            //callback to send new game to both users documents
            UserService.updateUserGames(user1, user2, self.displayGame.list[0]._id);

        })
    }

    self.submitDebate = function (newDebate) {
        //create the object to send to the update route
        let updateSet = {
            gameId: self.displayGame.list[0]._id,
            description: newDebate.description,
            winner: newDebate.winner,
            userscore: newDebate.userScore
        }
        //console.log('update set ', updateSet);
        $http.put('/game/newdebate', updateSet).then(function (response) {
            //console.log('$routeParams on game service', $routeParams);
            //get the game to refresh scores based on the route params
            self.getGame($routeParams.gameId);
           
        })
    }

    //self.getAllGames();
})