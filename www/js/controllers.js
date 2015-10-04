angular.module('starter.controllers', [])

.controller('LandingCtrl', function ($scope) {})
  .controller('LikesCtrl', ["$scope", "$firebaseArray", "$location", function ($scope, $firebaseArray, $location) {

    var ref2 = new Firebase("https://viridiana.firebaseio.com/likes");

    $scope.data = $firebaseArray(ref2); //array of all likes movies
    $scope.final_movies = null;
    $scope.currentMovie = null;
    window.skope = $scope;

    var liked_movies = [];
    var array_of_genres = ["genres/War", "genres/Thriller", "genres/Romance", "genres/Animation"];

    var counter = 0;
    var array_of_selected_movies = [];

    $scope.pass_data = function (final_movies) {

      $location.url('suggestions');

      console.log($scope.final_movies);

    //  $scope.$broadcast('myCustomEvent', {
      //  final_movies // 'Data to send'

    //  });


    };


    $scope.get_one_movie_per_genre = function (array) {

      for (i = 0; i < array.length; i++) {

        var queryRef = ref2.orderByChild(array[i]).equalTo(true).limitToFirst(20);

        queryRef.on("value", function (snapshot) {
          var i = 0;
          var rand = Math.floor(Math.random() * snapshot.numChildren());
          snapshot.forEach(function (selected_snapshot) {
            if (i == rand) {
              // console.log(selected_snapshot.val().title);

              array_of_selected_movies.push(selected_snapshot.val())
            }

            i++;
          });

          $scope.currentMovie = array_of_selected_movies[0];
          console.log(array_of_selected_movies);
        });

      }
      return array_of_selected_movies;
      console.log(array_of_selected_movies);

    };

    $scope.get_one_movie_per_genre(array_of_genres);

    $scope.save_movie = function (currentMovie) {

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

      console.log($scope.currentMovie.imdbID)
      for (i = 0; i < array_of_selected_movies.length; i++) {

        var next = i + 1;

        if (array_of_selected_movies[i].imdbID === $scope.currentMovie.imdbID) {

          $scope.currentMovie = array_of_selected_movies[3];
          console.log($scope.currentMovie.imdbID)

        }

      };
    };






}])

.controller('DetailsCtrl', function ($scope) {})

.controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {

  $scope.showAlert = function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Welcome!',
      template: 'To get started tap if you like the movie, swipe right if you do not!',
      okText: 'Got it!',
      okType: 'button button-light'
    });
    alertPopup.then(function (res) {
      console.log('Lets play!');
    });
  };
})


.controller('SuggestionsCtrl', function ($scope, Movies) {
  $scope.movies = Movies.all();
  console.log($scope.my_genres);


  /*
   $scope.$on('myCustomEvent', function (event, data) {
  
   final_movies
   
   for (i=0; i < final_movies.length; i++){
   
   final_movies[i].genres  =  objeto
   
   }
   
     
      // 'Data to send'
    
});
  
  
  var ref = new Firebase("https://viridiana.firebaseio.com/movies");

    $scope.data = $firebaseArray(ref);
  
   $scope.get_one_movie_per_genre = function (array) {

      for (i = 0; i < array.length; i++) {

        var queryRef = ref2.orderByChild(array[i]).equalTo(true).limitToFirst(20);

        queryRef.on("value", function (snapshot) {

          //  snapshot.val().genres.crime 
          //console.log(snapshot.key() + " is " +  snapshot.val().title + JSON.stringify(snapshot.val().poster));
          var i = 0;
          var rand = Math.floor(Math.random() * snapshot.numChildren());
          snapshot.forEach(function (selected_snapshot) {
            if (i == rand) {
              // console.log(selected_snapshot.val().title);

              array_of_selected_movies.push(selected_snapshot.val())
            }

            i++;
          });


          $scope.currentMovie = array_of_selected_movies[0];
          console.log(array_of_selected_movies);


        });

      }
      return array_of_selected_movies;
      console.log(array_of_selected_movies);

    };
    */
});
