angular.module('starter.controllers', [])

.controller('LandingCtrl', function ($scope) {})

.controller('LikesCtrl', ["$scope", "$firebaseArray", "$location", "Selection", function ($scope, $firebaseArray, $location, Selection) {

 var ref2 = new Firebase("https://viridiana.firebaseio.com/likes");

 $scope.data = $firebaseArray(ref2); //array of all likes movies
 $scope.final_movies = null;
 $scope.currentMovie = null;
 window.skope = $scope;
 var counter = 0;
 var tenMovies = [];
 var liked_movies = [];
 var movieGenres = ["genres/War", "genres/Thriller", "genres/Romance", "genres/Animation", "genres/Crime", "genres/Fantasy", "genres/Drama", "genres/Adventure"];

  $scope.randomMovies = function (array) {
     for (var i = 0; i < array.length; i++) {
       var queryRef = ref2.orderByChild(array[i]).equalTo(true).limitToFirst(20);
       queryRef.on("value", function (snapshot) {
         var i = 0;
         var rand = Math.floor(Math.random() * snapshot.numChildren());
         snapshot.forEach(function (selected_snapshot) {
           if (i == rand) {
             tenMovies.push(selected_snapshot.val())
           }
           i++;
         });
         $scope.currentMovie = tenMovies[0];
         console.log(tenMovies);
       });
     }
     return tenMovies;
   };
  $scope.randomMovies(movieGenres);

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
      console.log(myGenres)
      console.log(genresByPoints);

//  $scope.callToGenres = function () {
    
      Selection.addGenres(genresByPoints);
//     };

  };

      /*
  topGenres = [];
  for(var prop in genresByPoints) {
  var oneGenre = "genres/" + prop;
  topGenres.push(oneGenre);
  console.log(topGenres);
      return topGenres
    }

 
 */
  
  $scope.save_movie = function (currentMovie) {
    // Selection.like($scope.currentMovie)
    liked_movies.push($scope.currentMovie);

    counter++;

    if (counter === 3) {
        $scope.final_movies = liked_movies;
        $scope.pass_data();
    } else {
        $scope.next_movie();
    }
  };


  $scope.next_movie = function () {

    var currentIndex = tenMovies.indexOf($scope.currentMovie);

    $scope.currentMovie = tenMovies[currentIndex + 1];

  };

}])

.controller('DetailsCtrl', function ($scope, $stateParams) {
  debugger
  var imdbID = $stateParams.imdbID;

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
    });
  };
})


.controller('SuggestionsCtrl', function ($scope, Movies, Selection) {
  $scope.movies = [];

//  $scope.genres = Selection.getGenres();

  var ref = new Firebase("https://viridiana.firebaseio.com/spanish");
  var randomMovies = function (array) {

    for (i = 0; i < array.length; i++) {

      var queryRef = ref.orderByChild(array[i]).equalTo(true).limitToFirst(20);

      queryRef.on("value", function (snapshot) {

//        var j = 0;
//        var rand = Math.floor(Math.random() * snapshot.numChildren());
        snapshot.forEach(function (selected_snapshot) {
//            if (j == rand) {
            $scope.movies.push(selected_snapshot.val());
            $scope.$apply();
//            }
//            j++;
          });
        });
     }
    };
  randomMovies(["genres/Drama"]);
  
});
