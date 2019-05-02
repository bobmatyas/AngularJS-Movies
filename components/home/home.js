function HomeController(MovieService, $q) {
    const ctrl = this;

      // List of movies to parse    
      ctrl.search = [];

      // ctrl.show = false;

      //ctrl.watchList = [];

      console.log(MovieService.watchList);
      ctrl.addToWatchList = (movieId) => {
        console.log(`add to watch list clicked`);
        if (MovieService.watchList.length >= 1) {
          doesExist = MovieService.watchList.includes(movieId);
          if (doesExist === false) {
            MovieService.watchList.push(movieId);
          }
        } else {
            MovieService.watchList.push(movieId);
        }
        console.log(`current watch list: ${MovieService.watchList}`);  
      }

      ctrl.fetchMovies = () => {
        // Call service, then set our data
        return $q(function(resolve, reject) {
          MovieService.fetchMovies()
            .then( (response) => {

              let results = response;
              //console.log(response);
              
              response.data.results.forEach( function(child) {
                let childObj = {
                 movie_id: child.id,
                 movie_title: child.title,
                 movie_poster: child.poster_path, 
                 movie_vote_average: child.vote_average,
                 movie_release_date: child.release_date,
                 movie_original_language: child.original_language,
               }

              ctrl.search.push(childObj);

              if ( child === (results.length -1) ) {
                resolve();
             }
          });

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
  
<div class="container">
  <input type="text" ng-model="homeSearch" placeholder="Search by Title" />
  <label>Sort by Popularity: <select id="popularity">
    <option value="default">Default</option>
    <option value="ascending">Ascending</option>
    <option value="descending">Descending</option>
  </select></label>

  <label>Sort by Release Date: <select id="release-date">
    <option value="default">Default</option>  
    <option value="ascending">Ascending</option>
    <option value="descending">Descending</option>
  </select></label>

  <label>Sort by Movie Length: <select id="run-time">
    <option value="default">Default</option>
    <option value="ascending">Ascending</option>
    <option value="descending">Descending</option>
  </select></label>
    <div class="search-result-container">
    <!--   -->
      <div class="search-result-container-item" ng-repeat="post in $ctrl.search | filter: homeSearch | orderBy: 'movie_title'">
        <div class="search-result-photo"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/{{post.movie_poster}}" /> </div> <div class="search-result-contents"><h2>{{post.movie_title}}</h2>
          <i class="far fa-heart" ng-click="$ctrl.addToWatchList(post.movie_id)">Add to Favorites</i>
          <p>Popularity: {{post.movie_vote_average}}</p>
          <p>Release Date: {{post.movie_release_date}}</p>
          <p>Original Language: {{post.movie_original_language}}</p>
          </div>
          <!--- fas fa-heart for solid -->
        </div>
    </div>
</div>

        </section>`, // or use templateUrl
    controller: HomeController
  });