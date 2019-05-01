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
            let results = response;
            console.log(response);
            
            // Organize in to objects for each one
            response.data.results.forEach( function(child) {
              let childObj = {
                title: child.original_title, 
            }
            console.log(child.original_title);
            // Add to search array
              ctrl.search.push(childObj);
              // console.log(response);
              console.log(childObj);
            
            // Resolve the promise
            if ( child === (results.length -1) ) {
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
      <li ng-repeat="post in $ctrl.search | orderBy: "title" | filter: "search"> <input type="submit" value="Add to Watch List" />"> {{post.title}} </li>
    </ul>
</div>

        </section>`, // or use templateUrl
    controller: HomeController
  });