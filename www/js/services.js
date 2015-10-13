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
   var addSpanish = function(newObj){
    spanish = newObj;
  };
  
  var getSpanish = function() {
    return spanish;
  }; 
  
  
  return {
    addGenres: addGenres,
    getGenres: getGenres, 
    addSpanish: addSpanish,
    getSpanish: getSpanish,
    get: function(id) {
      for(var i=0; i <spanish.length; i++) {
        if (spanish[i].imdbID == id) {
          return spanish[i];
        }
      }
      return null;
    }
  };
  
})






