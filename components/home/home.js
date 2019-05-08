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

        <h1 class="main-title">Find a Movie</h1>
        <movie-list></movie-list>

      </section>`, // or use templateUrl
    controller: HomeController
  });