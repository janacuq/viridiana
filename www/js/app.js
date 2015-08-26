// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova', 'starter.controllers'])

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



app.run(function($cordovaStatusbar) {
  $cordovaStatusbar.overlaysWebView(true)


  $cordovaStatusBar.styleColor(black) //Black, transulcent

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
    views: {
      'suggestions': {
        templateUrl: 'templates/suggestions.html',
        controller: 'SuggestionsCtrl'
      }
    }
  })
    
    .state('details', {
    url: '/details',
    views: {
      'details': {
        templateUrl: 'templates/details.html',
        controller: 'DetailsCtrl'
      }
    }
  });
  
  $urlRouterProvider.otherwise('/landing');
  

});