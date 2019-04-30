function HomeController() {
    var ctrl = this;
}
  
  angular.module('MovieApp').component('home', {
    template: `
        <section id="home">
            <h3>Home</h3>
        <p>Search box here?</p>
        </section>`, // or use templateUrl
    controller: HomeController
  });