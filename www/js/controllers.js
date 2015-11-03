angular.module('starter.controllers', [])

.controller('LandingCtrl', function ($scope) {})

.controller('LikesCtrl', ["$scope", "$firebaseArray", "$location", "Selection", "$http", "$ionicModal", "$ionicHistory", function ($scope, $firebaseArray, $location, Selection, $http, $ionicModal, $ionicHistory) {

  $ionicHistory.nextViewOptions({
         disableAnimate: true,
         disableBack: true
});
  
  
  $scope.isLoading = true;

 var ref2 = new Firebase("https://viridiana.firebaseio.com/likes");

 $scope.data = $firebaseArray(ref2); //array of all likes movies
 $scope.final_movies = null;
 $scope.currentMovie = null;
 window.skope = $scope;
 $scope.clicked = true;
 $scope.done = false;
 var counter = 0;
 var tenMovies = [];
 var liked_movies = [];
 var movieGenres = ["genres/War", "genres/Thriller", "genres/Romance", "genres/Animation", "genres/Crime", "genres/Fantasy", "genres/Drama", "genres/Adventure"];

  $scope.icon = '/img/cross-icon.png';
  $scope.mouseUp = function() {
    $scope.icon = '/img/cross-icon.png';
  };
 
  $scope.mouseDown = function() {
    $scope.icon = '/img/cross-icon-hover.png';
  };
 
  
 var updateMovieWithPosterPath = function(movie){
   var url = 'http://api.themoviedb.org/3/find/' + movie.imdbID + '?external_source=imdb_id&api_key=8476e72920cda228501fdc61e9457aa0'
   $http.get(url).then(function(response){
     movie.posterPath = 'http://image.tmdb.org/t/p/w500' + response.data.movie_results.concat(response.data.tv_results)[0].poster_path;
   });
 };

  $scope.randomMovies = function (array) {
    // var movies = {}; // keys == genres, value == [list of movies]
    // randomMovies = [];
    // loop through movies and pick random movie from list of movies
    // for (var genre in movies){
    //  var candidate = movies[Math.random() * movies.length];
    // if candidate not in randomMovies
    // randomMovies.push(candidate);
    // else try again
    //}
   
     for (var i = 0; i < array.length; i++) {
       var queryRef = ref2.orderByChild(array[i]).equalTo(true).limitToFirst(30);
       queryRef.on("value", function (snapshot) {
         var i = 0;
         var rand = Math.floor(Math.random() * snapshot.numChildren());
         snapshot.forEach(function (selected_snapshot) {
           if (i == rand) {
             var movie = selected_snapshot.val();
             updateMovieWithPosterPath(movie);
           //  var existingMovie = tenMovies.find(function(m){
           //    return m.imdbID === movie.imdbID;
            // });
            // if (!existingMovie){
               tenMovies.push(movie);
            // } else {
            //   rand++;
           //  }
           }
           i++;
         });
         $scope.currentMovie = tenMovies[0];
          $scope.isLoading = false;
         console.log(tenMovies);
 
       });
     }
     return tenMovies;

   };
  

  $scope.pass_data = function () {

    $location.url('suggestions');
    var genresByPoints = {};
    var myGenres = [];

    for (var i = 0; i < $scope.final_movies.length; i++) {
      myGenres.push($scope.final_movies[i].genres);
    }
    for (var i = 0; i < myGenres.length; i++) {
      for (var prop in myGenres[i]) {
        if (genresByPoints[prop] >= 1) {
          genresByPoints[prop] = genresByPoints[prop] + 1;
        } else {
          genresByPoints[prop] = 1
        }
      }
    }
    Selection.addGenres(genresByPoints);
  };

  /*
  $scope.save_movie = function (index) {
    liked_movies.push(tenMovies[index]);
    counter++;
    cardSwipeRight(index);
    if (counter === 3) {
        $scope.final_movies = liked_movies;
        $scope.pass_data();
    }     
  };

  $scope.next_movie = function () {
    $scope.clicked = false;
    var currentIndex = tenMovies.indexOf($scope.currentMovie);
    $scope.currentMovie = tenMovies[currentIndex + 1];
  };
  */
  $scope.randomMovies(movieGenres);
  
  $scope.start = function(){
   
  $scope.cards = Array.prototype.slice.call(tenMovies, 0);
    $scope.done = true;
  };
  
   $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    
  };
  /*
  $scope.addCard = function() {
    var newCard = tenMovies[Math.floor(Math.random() * tenMovies.length)];
    newCard.id = Math.random();
    $scope.cards.push(newCard);
  };
  */
  $scope.cardSwipedLeft = function(index) {
     
      if ( index === 0  && counter > 1 ) {
      $scope.final_movies = liked_movies;
      $scope.pass_data();
    } else if( index === 0  && counter <= 1 ) {
      tenMovies = [];
      $scope.randomMovies(movieGenres);
      $scope.start();
    }
  };
 
    $scope.cardSwipedRight = function(index) {
      liked_movies.push(tenMovies[index]);
      console.log(liked_movies);
      counter++;
    
      if ( index === 1  && counter > 1 ) {
        $scope.final_movies = liked_movies;
        $scope.pass_data();
      } else if ( index === 1  && counter <= 1 ){
      $scope.start();
      } 
    };

}])

.controller('DetailsCtrl', function ($scope, $stateParams, Selection) {
  var imdbID = $stateParams.imdbID;
  $scope.spanish = Selection.get($stateParams.imdbID);
  
})





.controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {

  $scope.showAlert = function () {
    var alertPopup = $ionicPopup.alert({
    title: 'Welcome!',
    template: 'Let us know your tastes! If you like the movie we are showing tap the like button, otherwise swipe to the right and we will show you more!',
    okText: 'Got it!',
    okType: 'button button-light'
    });
      alertPopup.then(function (res) {
        $scope.start();
    });
  };
})


.controller('SuggestionsCtrl', function ($scope, Selection, $http, $timeout, $ionicLoading){
  
   $scope.show = function(){
  $ionicLoading.show({
    template: '<p>Loading Movies...</p><ion-spinner icon="circles" class="spinner-stable"></ion-spinner>'
  });
  };
 
  $scope.hide = function(){
  
    $ionicLoading.hide();
  };
  
  $scope.movies = [];

  $scope.genres = Selection.getGenres();
  var topGenres = [];   
  var getTopGenres = function(obj) {
    for(var prop in obj) {
    topGenres.push("genres/" + prop);
      } 
     return topGenres; 
  };
  
  getTopGenres($scope.genres);
 

  var ref = new Firebase("https://viridiana.firebaseio.com/spanish");
  var randomMovies = function (array) {
     $scope.show($ionicLoading);
    for (i = 0; i < array.length; i++) {

      var queryRef = ref.orderByChild(array[i]).equalTo(true).limitToFirst(20);

      queryRef.on("value", function (snapshot) {

        var j = 0;
        var rand = Math.floor(Math.random() * snapshot.numChildren());
        snapshot.forEach(function (selected_snapshot) {
            if (j == rand) {
             var movie = selected_snapshot.val();
             updateMovieWithPosterPath(movie);
             $scope.movies.push(movie)
             $scope.$apply();
            }
            j++;
          });
            Selection.addSpanish($scope.movies);
            
        }); 
     }
     
    };
  randomMovies(topGenres);
  
   var updateMovieWithPosterPath = function(movie){
   var url = 'http://api.themoviedb.org/3/find/' + movie.imdbID + '?external_source=imdb_id&api_key=8476e72920cda228501fdc61e9457aa0'
   $http.get(url).then(function(response){
     movie.posterPath = 'http://image.tmdb.org/t/p/w500' + response.data.movie_results.concat(response.data.tv_results)[0].poster_path;
       $scope.hide($ionicLoading); 
   });
 };

});
