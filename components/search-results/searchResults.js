function SearchResultsController() {
    var ctrl = this;
}
  
  angular.module('MovieApp').component('searchResults', {
    template: `
        <section id="search-results">
            <h3>Search Results</h3>
            <p>This Works!</p>
        </section>`, // or use templateUrl
    controller: SearchResultsController
  });