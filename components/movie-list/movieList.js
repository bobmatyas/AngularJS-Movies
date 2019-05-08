function MovieListController(MovieService, $q, $scope) {
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
  

  ctrl.addToWatchList = (movie) => {
    console.log(movie);
    MovieService.addToWatchList(movie);
  }

  ctrl.removeFromWatchList = (index) => {
    console.log(index);
    MovieService.removeFromWatchList(index);
    console.log("testing splice");
   
  }


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
              movie_poster: child.poster_path ? "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + child.poster_path : 'imgs/cover-placeholder.png',
              movie_overview: child.overview,
              movie_popularity: child.vote_average,
              movie_release_date: child.release_date,
              movie_original_language: child.original_language,
              movie_vote_count: child.vote_count
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




angular.module('MovieApp').component('movieList', {
  template: `
      <section id="movie-list">
              
      <search-criteria fetch-movies="$ctrl.fetchMovies(search)" sort-by="$ctrl.sortBy(propertyName, sortOrder)" search-completed="$ctrl.searchCompleted"></search-criteria>



    <div class="search-result-container">

    <h2 ng-if="$ctrl.searchCompleted" class="main-title">Results</h2>
      <div class="search-result-container-item" ng-repeat="post in $ctrl.search | orderBy: $ctrl.propertyName:$ctrl.reverse">
      <search-result-item post="post" add-to-watch-list="$ctrl.addToWatchList(movie)" remove-from-watch-list="$ctrl.removeFromWatchList(index)"></search-result-item>             
      </div>
    </div>

    <div class="pagination-container" ng-if="$ctrl.searchCompleted === true">
      <div class="pagination-link" ng-repeat="link in $ctrl.paginationMenu">
        <div ng-click="$ctrl.fetchMovies(link.search_term, link.page)">{{ link.page }}</div>
      </div>
    </div>
    </section>`, // or use templateUrl
  controller: MovieListController
});