angular.module('starter.controllers', [])

.controller('LandingCtrl', function ($scope, $ionicHistory) {
//disable back button on landing page
 $ionicHistory.nextViewOptions({
         disableAnimate: true,
         disableBack: true
});
  
  window.addEventListener("orientationchange", function(){
    console.log('Orientation changed to ' + screen.orientation);
    screen.lockOrientation('portrait');
});
  
})

.controller('LikesCtrl', ["$scope", "$firebaseArray", "$location", "Selection", "$http", "$ionicModal", "$ionicHistory","$ionicLoading", function ($scope, $firebaseArray, $location, Selection, $http, $ionicModal, $ionicHistory, $ionicLoading) {

// spinner functions
  $scope.show = function(){
    $ionicLoading.show({
    template: '<p>Loading Movies...</p><ion-spinner class="spinner-stable"></ion-spinner>'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

 $scope.show($ionicLoading);  //initialize spinner
  
 var ref2 = new Firebase("https://viridiana.firebaseio.com/likes");
 $scope.mostrar = false;
 $scope.data = $firebaseArray(ref2); //array of all likes movies
 $scope.final_movies = null;
 var counter = 0;
 var tenMovies = [];
 var liked_movies = [];
  var values = [];
 var movieGenres = ["genres/War", "genres/Thriller", "genres/Romance", "genres/Biography", "genres/Crime", "genres/Comedy", "genres/Drama", "genres/Adventure", "genres/Action", "genres/Horror"];

  

 var updateMovieWithPosterPath = function(movie){
   var url = 'http://api.themoviedb.org/3/find/' + movie.imdbID + '?external_source=imdb_id&api_key=8476e72920cda228501fdc61e9457aa0'
   $http.get(url).then(function(response){
     movie.posterPath = 'http://image.tmdb.org/t/p/w500' + response.data.movie_results.concat(response.data.tv_results)[0].poster_path;
   });
 };

  $scope.randomMovies = function (array) {
     for (var i = 0; i < array.length; i++) {
       var queryRef = ref2.orderByChild(array[i]).equalTo(true).limitToFirst(50);
       queryRef.on("value", function (snapshot) {
         var allMovies = snapshot.val();
         var rand = Math.floor(Math.random() * snapshot.numChildren());
         var randomKey = Object.keys(allMovies)[rand];
         var movie = allMovies[randomKey];
         var m = movie.imdbID;
         updateMovieWithPosterPath(movie);
       var existingMovie = values.indexOf(m);
            if (existingMovie < 0){
              tenMovies.push(movie);
               values.push(m);
              } else {
                rand++;
              }
         $scope.start();
         $scope.hide($ionicLoading);
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

  $scope.randomMovies(movieGenres);
  
  $scope.start = function(){
    $scope.cards = Array.prototype.slice.call(tenMovies, 0);
           
  };
  
   $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
   };
 
  $scope.cardSwipedLeft = function(index) {
    
      if (index === undefined){
       index = document.querySelector('td-cards').querySelectorAll("td-card").length - 1;         
      }
      if ( index === 0  && counter > 1 ) {
      $scope.final_movies = liked_movies;
      $scope.pass_data();
    } else if( index === 0  && counter <= 1 ) {
      tenMovies = [];
      $scope.randomMovies(movieGenres);
      $scope.start();
    }
  };
  
   $scope.$on('removeCardLeft', function(event, element, card) {
       
       index = document.querySelector('td-cards').querySelectorAll("td-card").length - 1;         
     console.log(index);
      if ( index === 0  && counter > 1 ) {
      $scope.final_movies = liked_movies;
      $scope.pass_data();
    } else if( index === 0  && counter <= 1 ) {
      tenMovies = [];
      $scope.show($ionicLoading);
      $scope.randomMovies(movieGenres);
       
      $scope.start();
    }
   });
   
  
    $scope.$on('removeCardRight', function(event, element, card) {
        $scope.mostrar = true;
       index = document.querySelector('td-cards').querySelectorAll("td-card").length - 1;    
      $scope.mostrar = true;
      console.log(index);
      liked_movies.push(tenMovies[index]);
      console.log(liked_movies);
      counter++;
      if ( index === 0  && counter > 1 ) {
      $scope.final_movies = liked_movies;
      $scope.pass_data();
    } else if( index === 0  && counter <= 1 ) {
      tenMovies = [];
      $scope.randomMovies(movieGenres);
      $scope.start();
    }   
  });

    setTimeout(function(){
      document.querySelector('.animated-heart').addEventListener('animationend', function(e){
        $scope.$apply(function() {
          $scope.mostrar = false;
        });
      }, true);
    });
 
    $scope.cardSwipedRight = function(index) {
      $scope.mostrar = true;
       
      console.log(index);
      liked_movies.push(tenMovies[index]);
      console.log(liked_movies);
      counter++;
    
      if ( index === 0  && counter > 1 ) {
        $scope.final_movies = liked_movies;
        $scope.pass_data();
      } else if ( index === 0  && counter <= 1 ){
      tenMovies = [];
      $scope.randomMovies(movieGenres);
      $scope.start();
      } 
    };

}])

.controller('DetailsCtrl', ['$scope', '$stateParams', 'Selection', '$window', function ($scope, $stateParams, Selection, $window) {
  var imdbID = $stateParams.imdbID;
  $scope.spanish = Selection.get($stateParams.imdbID);
 
  $scope.reviews = function(ref){
  window.open(this.ref,'_system', 'location=yes');return false;
  }
 
}])





.controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {

  $scope.showAlert = function () {
    var confirmPopup = $ionicPopup.confirm({
    title: 'Warning',
    template: 'You are about to loose your current suggestions. Would you like to start again from the beginning?',
    cancelText: 'Not yet',
    cancelType: 'button button-light',
    okText: 'Yes!',
    okType: 'button button-light'
    
    });
      confirmPopup.then(function (res) {
        if(res) {
         location.href = '/#/likes';
         location.reload();
        } 
    });
  };
})


.controller('SuggestionsCtrl', function ($scope, Selection, $http, $timeout, $ionicLoading){
    
  
  $scope.show = function(){
  $ionicLoading.show({
    template: '<p>Loading Suggestions...</p><ion-spinner class="spinner-stable"></ion-spinner>'
  });
  };
  
  $scope.reload = function(){
  location.href = '/#/likes';
  location.reload();
  };
 
  $scope.hide = function(){
   $ionicLoading.hide();
  };
  
  $scope.movies = [];
  values = [];

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

      var queryRef = ref.orderByChild(array[i]).equalTo(true).limitToFirst(40);

      queryRef.on("value", function (snapshot) {
        var allMovies = snapshot.val();
        var rand = Math.floor(Math.random() * snapshot.numChildren());
        var randomKey = Object.keys(allMovies)[rand];
        var movie = allMovies[randomKey];
        updateMovieWithPosterPath(movie);
        var m = movie.imdbID;
        var existingMovie = values.indexOf(m);
        console.log(existingMovie);
            if (existingMovie < 0){
        $scope.movies.push(movie);
        $scope.$apply();
        Selection.addSpanish($scope.movies);
        values.push(m);
              } else {
                rand++;
              }
             $scope.hide($ionicLoading);
        }); 
    
    } 
          

};
  randomMovies(topGenres);
  
   var updateMovieWithPosterPath = function(movie){
   var url = 'http://api.themoviedb.org/3/find/' + movie.imdbID + '?external_source=imdb_id&api_key=8476e72920cda228501fdc61e9457aa0'
   $http.get(url).then(function(response){
     movie.posterPath = 'http://image.tmdb.org/t/p/w500' + response.data.movie_results.concat(response.data.tv_results)[0].poster_path;
       
   });
 };

});




