function SearchResultItemController($scope, MovieService) {
  
  this.service = MovieService;
  
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
          <div class="favorite-button" ng-click="$ctrl.addToWatchList({movie: $ctrl.post})" ng-if="$ctrl.service.isInWatchList($ctrl.post.movie_id)===false">
            <i class="far fa-heart fa-lg" style="color:red;"></i> Add to Favorites
          </div>
          <div class="favorite-button" ng-click="$ctrl.removeFromWatchList({index: $ctrl.post.movie_id})" ng-if="$ctrl.service.isInWatchList($ctrl.post.movie_id)!==false">
            <i class="fas fa-heart fa-lg" style="color:red; background-color: #F5F5F5;" ></i> Remove from Favorites</i>
          </div>

          <p>Popularity: {{$ctrl.post.movie_popularity}}</p>
          <p>Release Date: {{$ctrl.post.movie_release_date}}</p>
          <p>Original Language: {{$ctrl.post.movie_original_language}}</p>
          <!--- fas fa-heart for solid -->

              <input type="button" ng-click="isShowHide('show')" value="Show More" class="showmore"> 
              <br />
            <p class="movie-description" ng-show="showval">{{$ctrl.post.movie_overview}}</p>
        `, // or use templateUrl
    controller: SearchResultItemController,
    bindings: {
      post: '<',
      addToWatchList: '&',
      removeFromWatchList: '&'
    }
  });