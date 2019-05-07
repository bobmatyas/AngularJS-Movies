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

    <h1>Search Movies</h1>
  <movie-list></movie-list>

        </section>`, // or use templateUrl
    controller: HomeController
  });