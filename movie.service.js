function MovieService(http) {
    const service = this;

       /**
     * Call https://www.reddit.com/r/aww/.json
     * and set ctrl.feed to be the results
     */

    service.watchList = [];

    service.addToWatchList = (movie) => {
      console.log(movie);
 
        if (service.watchList.length >= 1) {
          doesExist = service.watchList.includes(movie);
          if (doesExist === false) {
            service.watchList.push(movie);
          }
        } else {
          service.watchList.push(movie);
          console.log("check");
        }
        console.log(`current watch list: ${service.watchList}`);
      }
    
    service.isInWatchList = (movie) => {
      console.log("checking isInWatchList", service.watchList);
      if (service.watchList.length >= 1) {
        doesExist = service.watchList.includes(movie);
        console.log("Checking remove WatchList value", doesExist);
        return doesExist;
    }
    else {
      return false;
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