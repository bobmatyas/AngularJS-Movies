function WatchListController(MovieService) {
    var ctrl = this;

    ctrl.watchList = MovieService.watchList;

    console.log(`watch list page`);

    console.log(ctrl.watchList);
}
  
  angular.module('MovieApp').component('watchList', {
    template: `
        <section id="watch-list">
            <h3>Watch List</h3>
            <ul>
              <li ng-repeat="item in $ctrl.watchList">{{ item }}</li>
        </section>`, // or use templateUrl
    controller: WatchListController
  });