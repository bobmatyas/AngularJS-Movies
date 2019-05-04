function SearchResultsController(MovieService, $q) {
  var ctrl = this;

  // ctrl.fetchMovies = (search) => {
  //   Service.fetchMovies(search)
  //     .then((movies) => {
  //       ctrl.movies = movies
  //     })
  // }

  // List of movies to parse    
  ctrl.search = [];

  // ctrl.show = false;

  //ctrl.watchList = [];

  /**
   * The addToWatchList function takes the parameter movieId and adds that to the watchList
   * array that is stored in the service. 
   * 
   * The function is called in the ng-repeat for the search results. 
   * 
  */
  

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

  ctrl.fetchMovies = (search, page) => {
    // Call service, then set our data
    console.log("This was clicked");
    return $q(function (resolve, reject) {
      MovieService.fetchMovies(search, page)
        .then((response) => {

          let results = response;
          //console.log(response);
          ctrl.search = [];
          
          console.log(`Total pages of results: ${response.data.total_pages}`);
          
          /* this sets up pagination */

          let totalPages = response.data.total_pages;

          ctrl.paginationMenu = '';

          for (let i = 1; i <= totalPages; i++ ) {
            ctrl.paginationMenu = `${ctrl.paginationMenu}<div class="pagination-link"><a href="">${i}</a></div>`;
          }

          console.log(ctrl.paginationMenu);

          /* this loops through results */

          response.data.results.forEach(function (child) {
            let childObj = {
              movie_id: child.id,
              movie_title: child.title,
              movie_poster: child.poster_path,
              movie_overview: child.overview,
              movie_popularity: child.vote_average,
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


  /**
   * This section handles the sorting filters. 
   */
  
  ctrl.propertyName = '';
  ctrl.reverse = '';

  ctrl.sortBy = function(propertyName, sortOrder) {
    //ctrl.reverse = (ctrl.propertyName === propertyName) ? !ctrl.reverse : false;
    ctrl.propertyName = propertyName
    if (sortOrder) {
      ctrl.reverse = 'reverse';
    } else {
      ctrl.reverse = '';;
    }
  };

}

angular.module('MovieApp').component('searchResults', {
  template: `
      <section id="search-results">
            

      <label>Sort by Title: 
        <select id="title" ng-change="$ctrl.sortBy('movie_title', $ctrl.sort_by_title)" ng-model="$ctrl.sort_by_title">
          <option selected></option>
          <option value="">A-Z</option>
          <option value="reverse">Z-A</option>
        </select>
      </label>

      <label>Sort by Popularity: 
        <select id="popularity" ng-change="$ctrl.sortBy('movie_popularity', $ctrl.sort_by_popularity)" ng-model="$ctrl.sort_by_popularity">
          <option value="reverse">Highest Rated</option>
          <option value="">Lowest Rated</option>
        </select>
      </label>

      <label>Sort by Release Date: 
      <select id="releaseDate" ng-change="$ctrl.sortBy('movie_release_date', $ctrl.sort_by_release_date)" ng-model="$ctrl.sort_by_release_date">
        <option value="reverse">Newest</option>
        <option value="">Oldest</option>
      </select>
    </label>


      
      <br>
  
            <search-criteria fetch-movies="$ctrl.fetchMovies(search)"></search-criteria>



    <div class="search-result-container">
    <!--   -->
      <div class="search-result-container-item" ng-repeat="post in $ctrl.search | orderBy: $ctrl.propertyName:$ctrl.reverse">
        <div class="search-result-photo">
          <img ng-if="post.movie_poster" src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/{{post.movie_poster}}" /> 
        </div> 
        
        <div class="search-result-contents"><h2>{{post.movie_title}}</h2>
          <i class="far fa-heart" ng-click="$ctrl.addToWatchList(post.movie_id)">Add to Favorites</i>
          <p>Popularity: {{post.movie_popularity}}</p>
          <p>Release Date: {{post.movie_release_date}}</p>
          <p>Original Language: {{post.movie_original_language}}</p>
          <!--- fas fa-heart for solid -->
          <p>{{ post.movie_overview }}</p>
        </div>
    </div>

    <div class="pagination-container" ng-bind-html="$ctrl.paginationMenu">
     
    </div>
    </section>`, // or use templateUrl
  controller: SearchResultsController
});