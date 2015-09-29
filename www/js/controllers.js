angular.module('starter.controllers',[])

.controller('LandingCtrl', function($scope) {
})
.controller('LikesCtrl', ["$scope", "$firebaseArray", function($scope, $firebaseArray) {
 
     var ref2 = new Firebase("https://viridiana.firebaseio.com/likes");
  
  
 
   $scope.data = $firebaseArray(ref2); //array of all likes movies
 
     console.log($scope.data);
  
  $scope.currentMovie = null;
  window.skope = $scope;
  
  
   ref2.orderByChild("genres/Drama").equalTo(true).on("child_added", function(snapshot) {
   //  snapshot.val().genres.crime 
  console.log(snapshot.key() + " is " +  snapshot.val().title + JSON.stringify(snapshot.val().genres));
     $scope.currentMovie = snapshot.val();
});
 


  
  
  
  
}])

.controller('DetailsCtrl', function($scope) {
})

.controller('PopupCtrl', function($scope, $ionicPopup, $timeout) {
  
$scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Info',
      template: 'Please tap if you like the movie, swipe right if you do not!',
      okText: 'Continue playing',
      okType: 'button button-light'
    });
    alertPopup.then(function(res) {
      console.log('Lets play!');
    });
  };
})


.controller('SuggestionsCtrl', function($scope, Movies) {
    $scope.movies = Movies.all();
});