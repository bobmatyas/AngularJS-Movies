function HomeController(MovieService, $q) {
    const ctrl = this;

      // List of reddit posts to display    
      ctrl.search = [];
      // ctrl.show = false;

      ctrl.watchList = [];

      ctrl.addToWatchList = (movieId) => {
        console.log(`add to watch list clicked`);
        if (ctrl.watchList.length >= 1) {
          doesExist = ctrl.watchList.includes(movieId);
          if (doesExist === false) {
            ctrl.watchList.push(movieId);
          }
        } else {
            ctrl.watchList.push(movieId);
        }
      }

      ctrl.fetchMovies = () => {
        // Call service, then set our data
        return $q(function(resolve, reject) {
          MovieService.fetchMovies()
          .then( (response) => {

         // Get children from data
            // let children = response.data.data.children;
            let results = response;
            //console.log(response);
            
            // Organize in to objects for each one
            response.data.results.forEach( function(child) {
              let childObj = {
                movie_id: child.id,
                movie_title: child.title,
                movie_poster: child.poster_path 
              }

            console.log(child);

            //console.log(child.original_title);
            // Add to search array
              ctrl.search.push(childObj);
              // console.log(response);
              //console.log(childObj);
            
            // Resolve the promise
            if ( child === (results.length -1) ) {
              resolve();
            }
          });


//             console.log(response);
//             // Do something with this data

//             data.data.forEach( (item) => {
//               ctrl.search.push(`{title:response.data.data.children[i].data.author}`);
            
          });
        });
      };
    
    ctrl.fetchMovies()
    .then( () => {
      alert('completed');
    })
}
  
  angular.module('MovieApp').component('home', {
    template: `
        <section id="home">

    <h3>Search Movies  (home.js)</h3>
  
<div class="containter">
  <input type="text" ng-model="homeSearch" placeholder="Search" />
    <div class="search-result-container">
    <!--   -->
      <div class="search-result-container-item" ng-repeat="post in $ctrl.search | filter: homeSearch">
        <div class="search-result-photo"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/{{post.movie_poster}}" /> </div> <div><h2>{{post.movie_title}}</h2>  <button ng-click="$ctrl.addToWatchList(post.movie_id)" />Add to Watch List </button> </div>
      </div>
    </div>
</div>

        </section>`, // or use templateUrl
    controller: HomeController
  });