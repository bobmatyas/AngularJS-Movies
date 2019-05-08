function WatchListController(MovieService) {
    var ctrl = this;

    ctrl.watchList = MovieService.watchList;
    ctrl.removeFromWatchList = MovieService.removeFromWatchList;

    console.log(`watch list page`);

    console.log(ctrl.watchList);

}
  
angular.module('MovieApp').component('watchlistPage', {
    template: `
        <section id="watch-list">
            <h1>Watch List</h1>
            <ul class="favorites">
              <li ng-repeat="movie in $ctrl.watchList">
              <search-result-item post="movie" add-to-watch-list="$ctrl.addToWatchList(movie)" remove-from-watch-list="$ctrl.removeFromWatchList(index)"></search-result-item>              
              </li>
        </section>`, // or use templateUrl
    controller: WatchListController
  });