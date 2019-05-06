function WatchListController(MovieService) {
    var ctrl = this;

    ctrl.watchList = MovieService.watchList;

    console.log(`watch list page`);

    console.log(ctrl.watchList);

}
  
angular.module('MovieApp').component('watchlistPage', {
    template: `
        <section id="watch-list">
            <h1>Watch List</h1>
            <ul>
              <li ng-repeat="movie in $ctrl.watchList">
              <search-result-item post="movie" add-to-watch-list="$ctrl.addToWatchList(movie)"></search-result-item>              
              </li>
        </section>`, // or use templateUrl
    controller: WatchListController
  });