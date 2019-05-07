function MovieService(http) {
    const service = this;

       /**
     * Call https://www.reddit.com/r/aww/.json
     * and set ctrl.feed to be the results
     */

    service.watchList = [];

    service.addToWatchList = (movie) => {
      console.log(movie);
      if (service.isInWatchList(movie.movie_id) !== false) {
        console.log("already in watchList");
      }
      else {
        service.watchList.push(movie);
      }
        console.log(`current watch list: ${service.watchList}`);
      }
    
    service.isInWatchList = (movie_id) => {


    for (var i = 0 ; i < service.watchList.length; i++) {
      if (service.watchList[i].movie_id == movie_id) {
          return i;
      }

    }
    return false;
  }

  service.removeFromWatchList = (index) => {
    console.log(index);
    let i = service.isInWatchList(index);
    if (i !== false) {
      service.watchList.splice(i, 1);
    }
  }


    service.fetchMovies = (search, page) => {
        // return http.get('&language=en-US&page=1&include_adult=false&query='+search);   
        
        // sets default page to 1 //
        
        if (!page) {
          page = 1;
        }

        return http.get('https://api.themoviedb.org/3/search/movie?', {
          params: {
            api_key: 'ef7cff1004c652447b441abaac24655a', 
            query: search,
            page: page,
            include_adult: false,
          }
        });
        
    }
};
    

angular.module('MovieApp')
.service('MovieService', ['$http', MovieService]); // Passing $http service as dependency for our service