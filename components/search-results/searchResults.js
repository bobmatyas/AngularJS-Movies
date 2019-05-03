function SearchResultsController() {
    var ctrl = this;

    ctrl.fetchMovies = (search) => {
        Service.fetchMovies(search)
            .then( (movies) => {
                ctrl.movies = movies
            })
    }

}
  
  angular.module('MovieApp').component('searchResults', {
    template: `
        <section id="search-results">
            
            
                <div ng-repeat=""></div>
            <search-criteria fetch-movies="$ctrl.fetchMovies(s)"></search-criteria>


        </section>`, // or use templateUrl
    controller: SearchResultsController
  });