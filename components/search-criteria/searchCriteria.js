function SearchCriteriaController() {
    var ctrl = this;

    ctrl.fetchMovies({
        search: searchValues
    })

}
  
  angular.module('MovieApp').component('searchCriteria', {
    template: `
        <section id="search-results">
            <h3>Search Criteria</h3>
            <p>This Works!</p>
        </section>`, // or use templateUrl
    controller: SearchCriteriaController,
    bindings: {
        fetchMovies: "&"
    }
  });