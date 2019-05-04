function SearchResultsController(MovieService, $q) {
  var ctrl = this;


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

  // this sets a variable for first page load, changes to "true" if users have searched

  ctrl.searchCompleted = false; 

  ctrl.fetchMovies = (search, page) => {
    // Call service, then set our data
    console.log("This was clicked");

    return $q(function (resolve, reject) {
      ctrl.searchCompleted = true;
      MovieService.fetchMovies(search, page)
        .then((response) => {

          let results = response;
          //console.log(response);
          ctrl.search = [];
          
          console.log(`Total pages of results: ${response.data.total_pages}`);
          
          

          /* this sets up pagination */

          let totalPages = response.data.total_pages;

          ctrl.paginationMenu = [];

          for (let i = 1; i <= totalPages; i++ ) {
            // ctrl.paginationMenu = `${ctrl.paginationMenu}<div class="pagination-link" ng-click="$ctrl.fetchMovies('${search}', ${i})">page: ${i}</div>`;
            let paginationLink = {
              page: i,
              search_term: search
            }
            ctrl.paginationMenu.push(paginationLink);
          }

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
              
      <search-criteria fetch-movies="$ctrl.fetchMovies(search)" sort-by="$ctrl.sortBy(propertyName, sortOrder)" search-completed="$ctrl.searchCompleted"></search-criteria>



    <div class="search-result-container">
    <!--   -->
      <div class="search-result-container-item" ng-repeat="post in $ctrl.search | orderBy: $ctrl.propertyName:$ctrl.reverse">
        <div class="search-result-photo">
          <img ng-if="post.movie_poster" src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/{{post.movie_poster}}" alt="poster for {{post.movie_title}}" /> 
          <img ng-if="!post.movie_poster" src="imgs/cover-placeholder.png" alt="poster for {{ post.movie_title }}" /> 
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

    <div class="pagination-container" ng-if="$ctrl.searchCompleted === true">
    <h3>Pagination (this needs to be worked on in terms of UI, but it works)</h3>
      <div class="pagination-link" ng-repeat="link in $ctrl.paginationMenu">
        <div ng-click="$ctrl.fetchMovies(link.search_term, link.page)">{{ link.page }}</div>
      </div>
    </div>
    </section>`, // or use templateUrl
  controller: SearchResultsController
});