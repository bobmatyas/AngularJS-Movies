function RedditService(http) {
    const service = this;

       /**
     * Call https://www.reddit.com/r/aww/.json
     * and set ctrl.feed to be the results
     */
    service.fetchAwwSubreddit = () => {
        // $http stuff goes here; the actual call of the API
        return http.get('https://www.reddit.com/r/aww/.json?limit=19');
            // data: { 
            //     limit: 10 
            // }
        }
            // .then(function(response){
            //     return response.data;
            // });
    };


angular.module('RedditApp')
.service('RedditService', ['$http', RedditService]); // Passing $http service as dependency for our service