angular.module('starter.controllers',[])

.controller('LandingCtrl', function($scope) {
})
.controller('LikesCtrl', function($scope) {
 
})

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