function WatchListController() {
    var ctrl = this;
}
  
  angular.module('MovieApp').component('watchList', {
    template: `
        <section id="watch-list">
            <h3>Watch List</h3>
            <p></p>
        </section>`, // or use templateUrl
    controller: WatchListController
  });