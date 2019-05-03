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
      
        <label>Sort by Language: <select id="original-language">
          <option value="default">Default</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select></label>
      
        <br>
        <button ng-click="$ctrl.fetchMovies({search: $ctrl.homeSearch})" id="search-title">Click</button>
        <br>
      
    </div>


        </section>`, // or use templateUrl
    controller: SearchCriteriaController,
    bindings: {
        fetchMovies: "&"
    }
  });