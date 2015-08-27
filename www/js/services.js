angular.module('starter.services', [])

.factory('Movies', function() {

var movies = [{
  awards: "30 wins & 20 nominations.",
  boxoffice: "N/A",
  cast: {
    actors: ["Luis Tosar", "Alberto Ammann", "Antonio Resines", "Manuel Morón"],
    directors: ["Daniel Monzón"],
    writers: ["Jorge Guerricaechevarría (adaptation)", "Daniel Monzón (adaptation)", "Francisco Pérez Gandul (novel)"]
  },
  country: ["Spain", "France"],
  dvd: "29 Aug 2011",
  genres: ["Action", "Drama", "Thriller"],
  imdbID: "tt1242422",
  imdbRating: "7.7",
  imdbVotes: "45,740",
  languages: ["Spanish", "Basque", "English"],
  plot: "The story of two men on different sides of a prison riot -- the inmate leading the rebellion and the young guard trapped in the revolt, who poses as a prisoner in a desperate attempt to survive the ordeal.",
  poster: "http://ia.media-imdb.com/images/M/MV5BMTU5NTQ2NTMyMV5BMl5BanBnXkFtZTcwNzA0MTcyOQ@@._V1_SX300.jpg",
  production: "Paramount Pictures",
  rate: "N/A",
  released: "06 Nov 2009",
  rottentomato:  {
    tomato_consensus: "N/A",
    tomato_fresh: "34",
    tomato_image: "fresh",
    tomato_meter: "97",
    tomato_rating: "7.5",
    tomato_reviews: "35",
    tomato_rotten: "1",
    tomato_usermeter: "88",
    tomato_userrating: "4.0",
    tomato_userreviews: "5145"
  },
  runtime: "113 min",
  title: "Cell 211",
  type: "movie",
  website: "N/A",
  year: "2009"
},
  {
  awards: "1 win & 2 nominations.",
  boxoffice: "N/A",
  cast: {
    actors: ["Mario Casas", "María Valverde", "Álvaro Cervantes", "Marina Salas"],
    directors: ["Fernando González Molina"],
    writers: ["Federico Moccia (novel)", "Ramón Salazar"]
  },
  country: ["Spain"],
  dvd: "N/A",
  genres: ["Drama", "Romance"],
  imdbID: "tt1648216",
  imdbRating: "7.1",
  imdbVotes: "13,250",
  languages: ["Spanish"],
  plot: "Story of two young people who belong to different worlds. It is the chronicle of a love improbable, almost impossible but inevitable dragging in a frantic journey they discover the first ...",
  poster: "http://ia.media-imdb.com/images/M/MV5BMTg0NzY0MjI0NF5BMl5BanBnXkFtZTgwMjcxMjU5MzE@._V1_SX300.jpg",
  production: "Warner Bros. Pictures",
  rate: "N/A",
  released: "03 Dec 2010",
  rottentomato: {
    tomato_consensus: "N/A",
    tomato_fresh: "N/A",
    tomato_image: "N/A",
    tomato_meter: "N/A",
    tomato_rating: "N/A",
    tomato_reviews: "N/A",
    tomato_rotten: "N/A",
    tomato_usermeter: "66",
    tomato_userrating: "3.7",
    tomato_userreviews: "1015"
  },
  runtime: "118 min",
  title: "Three Steps Above Heaven",
  type: "movie",
  website: "N/A",
  year: "2010"
}, {
  awards: "2 wins & 9 nominations.",
  boxoffice: "N/A",
  cast: {
    actors: ["Antonio Banderas", "Penélope Cruz", "Coté Soler", "Antonio de la Torre"],
    directors: ["Pedro Almodóvar"],
    writers: ["Pedro Almodóvar"]
  },
  country: ["Spain"],
  dvd: "N/A",
  genres: ["Comedy"],
  imdbID: "tt2243389",
  imdbRating: "5.6",
  imdbVotes: "14,949",
  languages: ["Spanish"],
  plot: "When it appears as though the end is in sight, the pilots, flight crew, and passengers of a plane heading to Mexico City look to forget the anguish of the moment and face the greatest danger, which we carry within ourselves.",
  poster: "http://ia.media-imdb.com/images/M/MV5BMjM0MDY2OTEzNl5BMl5BanBnXkFtZTcwMjI5ODU0OQ@@._V1_SX300.jpg",
  production: "N/A",
  rate: "R",
  released: "08 Mar 2013",
  rottentomato: {
    tomato_consensus: "N/A",
    tomato_fresh: "N/A",
    tomato_image: "N/A",
    tomato_meter: "N/A",
    tomato_rating: "N/A",
    tomato_reviews: "N/A",
    tomato_rotten: "N/A",
    tomato_usermeter: "N/A",
    tomato_userrating: "N/A",
    tomato_userreviews: "N/A"
  },
  runtime: "90 min",
  title: "I'm So Excited!",
  type: "movie",
  website: "N/A",
  year: "2013"
}];

return {
  all: function() {
    return movies;
    }
  };
});
