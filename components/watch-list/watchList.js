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
              <li ng-repeat="item in $ctrl.watchList">{{ item }}</li>
        </section>`, // or use templateUrl
    controller: WatchListController
  });