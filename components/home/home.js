function HomeController(MovieService, $q) {
    const ctrl = this;

     
    
    // ctrl.fetchMovies()
    // .then( () => {
    //   alert('completed');
    // })
}
  
  angular.module('MovieApp').component('home', {
    template: `
        <section id="home">

    <h3>Search Movies  (home.js)</h3>
  <search-results></search-results>

        </section>`, // or use templateUrl
    controller: HomeController
  });