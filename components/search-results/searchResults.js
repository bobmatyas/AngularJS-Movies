function SearchResultsController(MovieService, $q) {
  var ctrl = this;

  ctrl.fetchMovies = (search) => {
    Service.fetchMovies(search)
      .then((movies) => {
        ctrl.movies = movies
      })
  }

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

  ctrl.fetchMovies = (search) => {
    // Call service, then set our data
    console.log("This was clicked");
    return $q(function (resolve, reject) {
      MovieService.fetchMovies(search)
        .then((response) => {

          let results = response;
          //console.log(response);
          ctrl.search = [];
          response.data.results.forEach(function (child) {
            let childObj = {
              movie_id: child.id,
              movie_title: child.title,
              movie_poster: child.poster_path,
              movie_popularity: child.popularity,
              movie_release_date: child.release_date,
              movie_original_language: child.original_language,
            }

            ctrl.search.push(childObj);

            if (child === (results.length - 1)) {
              resolve();
            }
          });

        });
    });
  };

  ctrl.propertyName = 'movie_popularity';
  ctrl.reverse = false;

  ctrl.sortBy = function(propertyName) {
    console.log(`sort clicked`);
    console.log(propertyName);
    ctrl.reverse = (ctrl.propertyName === propertyName) ? !ctrl.reverse : false;
    ctrl.propertyName = propertyName;
    console.log(ctrl.reverse);
    console.log(propertyName);
  };

  console.log(ctrl.propertyName);
}

angular.module('MovieApp').component('searchResults', {
  template: `
        <section id="search-results">
            

      <label>Sort by Title: 
        <select id="title" ng-change="$ctrl.sortBy('movie_title')" ng-model="sort_by_title">
          <option value="ascending" ng-click="$ctrl.sortBy('movie_title')">A-Z</option>
          <option value="descending" ng-click="$ctrl.sortBy('movie_title')">Z-A</option>
        </select>
      </label>
      
      <br>
      <button ng-click="$ctrl.sortBy('movie_title')">Title</button>
        <p class="sortorder" ng-show="$ctrl.propertyName === 'movie_title'" ng-class="{reverse: reverse}"> reverse</p>

                
            <search-criteria fetch-movies="$ctrl.fetchMovies(search)"></search-criteria>



    <div class="search-result-container">
    <!--   -->
      <div class="search-result-container-item" ng-repeat="post in $ctrl.search | orderBy: $ctrl.propertyName:$ctrl.reverse">
        <div class="search-result-photo"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/{{post.movie_poster}}" /> </div> <div class="search-result-contents"><h2>{{post.movie_title}}</h2>
          <i class="far fa-heart" ng-click="$ctrl.addToWatchList(post.movie_id)">Add to Favorites</i>
          <p>Popularity: {{post.movie_vote_average}}</p>
          <p>Release Date: {{post.movie_release_date}}</p>
          <p>Original Language: {{post.movie_original_language}}</p>
          </div>
          <!--- fas fa-heart for solid -->
        </div>
    </div>

        </section>`, // or use templateUrl
  controller: SearchResultsController
});