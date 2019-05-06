function SearchResultItemController($scope) {
  $scope.showval = false;
  // $scope.hideval = false;
  $scope.isShowHide = function (param) {
  if (param == "show") {
  $scope.showval = true;
  // $scope.hideval = true;
  }
  // else if (param == "hide") {
  // $scope.showval = false;
  // $scope.hideval = false;
  // }
  else {
  $scope.showval = true;
  $scope.hideval = false;
  }
  }
}
  angular.module('MovieApp').component('searchResultItem', {
    template: `
        <div class="search-result-photo">
          <img ng-if="$ctrl.post.movie_poster" ng-src="{{$ctrl.post.movie_poster}}" alt="poster for {{$ctrl.post.movie_title}}" /> 
          <img ng-if="!$ctrl.post.movie_poster" ng-src="imgs/cover-placeholder.png" alt="poster for {{ $ctrl.post.movie_title }}" /> 
        </div> 
        
        <div class="search-result-contents"><h2>{{$ctrl.post.movie_title}}</h2>
          <i class="far fa-heart" ng-click="$ctrl.addToWatchList({movie: $ctrl.post})">Add to Favorites</i>
          <p>Popularity: {{$ctrl.post.movie_popularity}}</p>
          <p>Release Date: {{$ctrl.post.movie_release_date}}</p>
          <p>Original Language: {{$ctrl.post.movie_original_language}}</p>
          <!--- fas fa-heart for solid -->
          <div>
            <div >
              <input type="button" ng-click="isShowHide('show')" value="Show More" class="showmore"> 
              <br />
            <div ng-show="showval">{{$ctrl.post.movie_overview}}</div><br />
          </div>
          </div>
        `, // or use templateUrl
    controller: SearchResultItemController,
    bindings: {
      post: '<',
      addToWatchList: '<'
    }
  });