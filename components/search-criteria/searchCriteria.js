function SearchCriteriaController() {
  var ctrl = this;

  // ctrl.fetchMovies({
  //     search: searchValues
  // })

}

angular.module('MovieApp').component('searchCriteria', {
  template: `
    <section id="search-results">
            
      <div class="container">
        <input type="text" ng-model="$ctrl.homeSearch" placeholder="Search by Title" />
        <button ng-click="$ctrl.fetchMovies({search: $ctrl.homeSearch})" id="search-title"><i class="fa fa-search" aria-hidden="true"></i>
        Search</button>
        <br>
          
        <div class="search-criteria-container" ng-if="$ctrl.searchCompleted">
          
          <label>Sort by Title: 
            <select id="title" ng-change="$ctrl.sortBy({propertyName: 'movie_title', sortOrder: $ctrl.sort_by_title})" ng-model="$ctrl.sort_by_title">
              <option value="">A to Z</option>
              <option value="reverse">Z to A</option>
              <option value="" disabled selected>Sort</option>
            </select>
          </label>

          <label>Sort by Popularity: 
            <select id="popularity" ng-change="$ctrl.sortBy({propertyName: 'movie_popularity', sortOrder: $ctrl.sort_by_popularity})" ng-model="$ctrl.sort_by_popularity">
              <option value="reverse">Highest Rated</option>
              <option value="">Lowest Rated</option>
              <option value="" disabled selected>Sort</option>    
            </select>
          </label>

          <label>Sort by Release Date: 
            <select id="releaseDate" ng-change="$ctrl.sortBy({propertyName: 'movie_release_date', sortOrder: $ctrl.sort_by_release_date})" ng-model="$ctrl.sort_by_release_date">
              <option value="reverse">Newest</option>
              <option value="">Oldest</option>
              <option value="" disabled selected>Sort</option>
            </select>
         </label>
      
        </div>
      </div>
    </section>`, // or use templateUrl
  controller: SearchCriteriaController,
  bindings: {
    fetchMovies: "&",
    sortBy: "&",
    searchCompleted: "<"
  }
});