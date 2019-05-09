
function SearchResultItemController($scope, MovieService) {
  
  this.service = MovieService;
  
  const ctrl = this;

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

  ctrl.dateFormat = (date) => {
    let dateCheck = new Date(date);
    let dateFormatted = dateCheck.toLocaleDateString();
    return dateFormatted;
  }

}
  angular.module('MovieApp').component('searchResultItem', {
    template: `
        <div class="search-result-section">

        <h2 class="heading-movie-title">{{$ctrl.post.movie_title}}</h2>
        <div class="search-result-inner">

        <div class="search-result-photo">
          <img ng-if="$ctrl.post.movie_poster" ng-src="{{$ctrl.post.movie_poster}}" alt="poster for {{$ctrl.post.movie_title}}" /> 
          <img ng-if="!$ctrl.post.movie_poster" ng-src="imgs/cover-placeholder.png" alt="poster for {{ $ctrl.post.movie_title }}" /> 
        </div> 
        
        <div class="search-result-contents">
          <div class="favorite-button" ng-click="$ctrl.addToWatchList({movie: $ctrl.post})" ng-if="$ctrl.service.isInWatchList($ctrl.post.movie_id)===false">
            <i class="far fa-heart fa-lg" style="color: #D50062;"></i> <span style="color: #D50062;">Favorite</span>
          </div>
          <div class="favorite-button" ng-click="$ctrl.removeFromWatchList({index: $ctrl.post.movie_id})" ng-if="$ctrl.service.isInWatchList($ctrl.post.movie_id)!==false">
            <i class="fas fa-heart fa-lg" style="color: #D50062; background-color: #fff;" ></i> <span style="color: #D50062;">Remove</span></i>
          </div>

          <table class="movie-meta">
            <tr><td><b>Average Rating:</td><td> {{$ctrl.post.movie_popularity}}</td></tr>
          <tr><td><b>Number of Votes:</b></td><td> {{ $ctrl.post.movie_vote_count}}</td></tr>
          <tr><td><b>Release Date:</b></td><td> {{ $ctrl.dateFormat($ctrl.post.movie_release_date)}}</td></tr>
          </table>

              <input type="button" ng-click="isShowHide('show')" value="See More" class="showmore"> 
              <br />
            <p class="movie-description" ng-show="showval">{{$ctrl.post.movie_overview}}</p>
        </div>
        </div>
      </div>  
        `, // or use templateUrl
    controller: SearchResultItemController,
    bindings: {
      post: '<',
      addToWatchList: '&',
      removeFromWatchList: '&'
    }
  });