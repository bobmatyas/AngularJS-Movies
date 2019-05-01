function MovieService(http) {
    const service = this;

       /**
     * Call https://www.reddit.com/r/aww/.json
     * and set ctrl.feed to be the results
     */
    service.fetchMovies = () => {
        // $http stuff goes here; the actual call of the API
        // return http.get('https://api.themoviedb.org/3/search/movie?api_key=ef7cff1004c652447b441abaac24655a&language=en-US&page=1&include_adult=false&query=');
        return http.get('https://api.themoviedb.org/3/discover/movie?api_key=ef7cff1004c652447b441abaac24655a&language=en-US&include_adult=false&query='); 
            // data: { 
            //     limit: 10 
            // }
        }
            // .then(function(response){
            //     return response.data;
            // });
    };
    

angular.module('MovieApp')
.service('MovieService', ['$http', MovieService]); // Passing $http service as dependency for our service