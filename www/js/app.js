// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards', 'firebase',  'starter.controllers', 'starter.services'])

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
  

})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.filter('string', function() {

  return function(obj) {
      var array = [];
    for(var prop in obj){
      array.push(obj[prop]);  
    }
    var one = array.join(', ');
     return one;
  }

});




