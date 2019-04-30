function HomeController(MovieService, $q) {
    const ctrl = this;

      // List of reddit posts to display    
      ctrl.search = [];
      // ctrl.show = false;
    
      /**
       * Call https://www.reddit.com/r/aww/.json
       * and set ctrl.search to be the results
       */

      ctrl.fetchMovies = () => {
        // Call service, then set our data
        return $q(function(resolve, reject) {
          MovieService.fetchMovies()
          .then( (response) => {

            // Get children from data
            let children = response.data.data.children;
            
            // Organize in to objects for each one
            children.forEach( function(child, index) {
              let childObj = {
                title: child.data.title,
                img: child.data.thumbnail,
                permalink: child.data.permalink
            }

            // Add to search array
              ctrl.search.push(childObj);
              console.log(response);
            
            // Resolve the promise
            if ( index === (children.length -1) ) {
              resolve();
            }
          });

//             console.log(response);
//             // Do something with this data

//             data.data.forEach( (item) => {
//               ctrl.search.push(`{title:response.data.data.children[i].data.author}`);
            
          });
        });
      };
    
    ctrl.fetchMovies()
    .then( () => {
      alert('completed');
    })
}
  
  angular.module('MovieApp').component('home', {
    template: `
        <section id="home">
            <h3>Home</h3>
        <p>Search box here?</p>

        <input type="text" placeholder="Search" />



        </section>`, // or use templateUrl
    controller: HomeController
  });