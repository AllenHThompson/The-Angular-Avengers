var app = angular.module('app',[]);

app.controller('JobSearch', function($scope, $http){

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
          $scope.resultList = data.SearchResult.SearchResultItems;
          console.log(data);


          var markers = $scope.resultList.map(function(job) {
               var locationList = job.MatchedObjectDescriptor.PositionLocation;

               //funtiont to fliter the list of jobs to only Georgia
               function filterForGa(locationList){
                    if(locationList.CountrySubDivisionCode === 'Georgia'){
                         return true;
                    }else
                         return false;
               }
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
                    var contentString = '<a href =' + job.MatchedObjectDescriptor.PositionURI + '>Apply To This Job</a>';

                    var infowindow = new google.maps.InfoWindow({
                         content: contentString
                    });
                    marker.addListener('click', function() {
                         infowindow.open(map, marker);
                    });
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
          zoom: 10
     };

     var map = new google.maps.Map(document.getElementById('map'), mapOtions);

});
