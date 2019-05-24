function MovieDetailsController(MovieService, $q, $routeParams) {
  
  var ctrl = this;

  ctrl.contentToShow = '';

  ctrl.getMovieDetails = (id) => {
    
    return $q(function (resolve, reject) {
      MovieService.getMovieDetail(id)
        .then((response) => {

          let details = response;
          
          console.log(details);
          

          ctrl.contentToShow = details;
        });
    });
  }

  ctrl.getMovieDetails($routeParams.id);

  ctrl.dateFormat = (date) => {
    let dateCheck = new Date(date);
    let dateFormatted = dateCheck.toLocaleDateString();
    return dateFormatted;
  }


}




angular.module('MovieApp').component('movieDetails', {
  template: `
    <section id="movie-list">
      
      <h2>{{ $ctrl.contentToShow.data.original_title }}</h2>

      <img ng-if="$ctrl.contentToShow.data.backdrop_path" src="https://image.tmdb.org/t/p/w1400_and_h450_face/{{ $ctrl.contentToShow.data.backdrop_path }}" class="splash" />

      <p ng-if="$ctrl.contentToShow.data.overview" class="overview-text">{{ $ctrl.contentToShow.data.overview }}</p>

      <h3 class="heading-movie-details-title">Details</h3>

      <p ng-if="$ctrl.contentToShow.data.release_date">Release Date: {{ $ctrl.dateFormat($ctrl.contentToShow.data.release_date) }}</p>
      <p ng-if="$ctrl.contentToShow.data.original_language">Language: {{ $ctrl.contentToShow.data.original_language }}</p>
      <p ng-if="$ctrl.contentToShow.data.homepage">Official Website: <a href="{{ $ctrl.contentToShow.data.homepage }}" target=_blank>{{ $ctrl.contentToShow.data.homepage }}</a></p>

    </section>`, // or use templateUrl
  controller: MovieDetailsController
});