angular.module('starter.services', [])

.service('Selection', function() {
  var genresToMatch = {};
  var spanish = {};
  var addGenres = function(newObj){
    genresToMatch = newObj;
  };
  
  var getGenres = function() {
    return genresToMatch;
  };
 
  return {
    addGenres: addGenres,
    getGenres: getGenres,  
  };
  
})






