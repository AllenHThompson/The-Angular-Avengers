var app = angular.module('app',[]);

function filterForGa(locationList){
     if(locationList.CountrySubDivisionCode === 'Georgia'){
          return true;
     } else
     return false;
}

app.controller('JobSearch', function($scope, $http){
     $scope.getGeorgiaLocation = function(job){
          var cityList = job.MatchedObjectDescriptor.PositionLocation;
          var gaLocations = cityList.filter(filterForGa);
          return gaLocations[0];
     }
     $scope.openInfoWindow = function(job){
          job.infoWindow.open(map, job.marker);
     }
     // job search api call
     $http({
          url: 'https://data.usajobs.gov/api/search',
          params: {
               JobCategoryCode: 2210,
               LocationName: 'Atlanta, Georgia'
          },
          headers: {
               //'User-Agent': 'allenhthompson1@gmail.com',
               'Authorization-Key': 'MfbLK4LehC6CQvAg3U9nr2Y0nBS5IHnMJjPK+KuoWbM='
          }
     }).success(function(data) {
          var allResultsList = data.SearchResult.SearchResultItems;

          var filterGeorgiaResults = function(oneResult) {
               var cityList = oneResult.MatchedObjectDescriptor.PositionLocation;
               var gaLocations = cityList.filter(filterForGa);


               if (gaLocations.length > 0) {
                    return true;
               } else
               return false;



               /*
               1. store locationList as a variable
               2. filter locationList to only GA locations, store that in variable
               3. if GA locations is empty (length of 0), return false, otherwise return true
               */
          };

          function clearMarker() {
               setMapOnAll(null);
          }
          $scope.georgiaResultsList = allResultsList.filter(filterGeorgiaResults);
          // $scope.resultList = data.SearchResult.SearchResultItems;
          console.log($scope.georgiaResultsList);

          var markers = $scope.georgiaResultsList.map(function(job) {

               var locationList = job.MatchedObjectDescriptor.PositionLocation;

               //funtiont to fliter the list of jobs to only Georgia

               var locationsInGeorgia = locationList.filter(filterForGa);

               locationsInGeorgia.map(function(location){
                    var lat = location.Latitude;
                    var lng = location.Longitude;
                    var position = {
                         lat: lat,
                         lng: lng
                    };

                    var marker = new google.maps.Marker({
                         anchorPoint:new google.maps.Point(0,-8),
                         position: position,
                         map: map,
                    });
                    job.marker = marker
                    var contentString = '<a href =' + job.MatchedObjectDescriptor.PositionURI + '>Apply To This Job</a>' + '<h5>' + job.MatchedObjectDescriptor.PositionTitle + '</h5>';


                    var infoWindow = new google.maps.InfoWindow({
                         content: contentString
                    });
                    job.infoWindow = infoWindow;
                    marker.addListener('click', function() {
                         infoWindow.open(map, marker);
                    });
                    //REMOVE THE CODE BELOW
                    // var infowindow = new google.maps.InfoWindow();
                    // function openInfoWindow(job){
                    //      var contentString = '<a href =' + job.MatchedObjectDescriptor.PositionURI + '>Apply To This Job</a>' + '<h5>' + job.MatchedObjectDescriptor.PositionTitle + '</h5>';
                    //
                    //      infoWindow.setContent(contentString);
                    //
                    //REMOVE THE CODE ABOVE

               });

          });

          //<a href = "LINK"></a>

     });

     // google map api call
     var centerLatLng = {
          lat: 33.7490,
          lng: -84.3880
     };

     var mapOtions = {
          center: centerLatLng,
          zoom: 8
     };

     var map = new google.maps.Map(document.getElementById('map'), mapOtions);

});
