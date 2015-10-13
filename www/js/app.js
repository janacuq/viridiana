// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'firebase',  'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
     /*
    var ref = new Firebase("https://viridiana.firebaseio.com/movies");
  
 
   ref.orderByChild("poster").equalTo("N/A").on("child_added", function(snapshot) {
  console.log(snapshot.key() + " is " +  snapshot.val().title + snapshot.val().poster);
}); 
   */
   
    
    
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    
    .state('landing', {
    url: '/landing',
    templateUrl: 'templates/landing.html',
    controller: 'LandingCtrl'
     
  })
  
    .state('likes', {
    url: '/likes',
    templateUrl: 'templates/likes.html',
    controller: 'LikesCtrl'
     
  })
  
    .state('suggestions', {
    url: '/suggestions',
    templateUrl: 'templates/suggestions.html',
    controller: 'SuggestionsCtrl'
      
  })
    
    .state('details', {
    url: '/details/:imdbID',
    templateUrl: 'templates/details.html',
    controller: 'DetailsCtrl'
  });
  
  $urlRouterProvider.otherwise('/likes');
  

});




