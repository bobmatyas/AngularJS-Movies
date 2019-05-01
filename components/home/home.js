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
            // let children = response.data.data.children;
            let results = response.results;
            
            // Organize in to objects for each one
            results.forEach( function(results, index) {
              let childObj = {
                title: results.title, 
            }

            // Add to search array
              ctrl.search.push(childObj);
              console.log(response);
            
            // Resolve the promise
            if ( index === (results.length -1) ) {
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

    <h3>Search Movies  (home.js)</h3>
  
<div class="containter">
  <input type="text" ng-model="search" placeholder="Search" />
  input type="text" ng-model="search" placeholder="Search" 
    <ul>
      <li> ng-repeat="post in ctrl.search | orderBy: "name" | filter: search <input type="submit" value="Add to Watch List" /></li>
    </ul>
</div>

        </section>`, // or use templateUrl
    controller: HomeController
  });