"use strict";
angular
  .module("MovieApp")
  // Configuring the routing
  // The config method must have an array as the parameter. The array contains two elements, $routeProvider (as a string) and an arrow function with $routeProvider as a parameter
  .config(["$routeProvider", ($routeProvider) => {
    $routeProvider
      // When the user visits the display route...
      .when("/home", {
        // Load the home component
        template: "<home></home>"
      })
      .when("/search-results", {
        // Load the search-results component
        template: "<search-results></search-results>"
      })
      .when("/watch-list", {
        // Load the watch-list component
        template: "<watchlist-page></watchlist-page>"
      })
      

      .otherwise( {
        // Otherwise, go home component
        redirectTo: "/home"
      })
}]);