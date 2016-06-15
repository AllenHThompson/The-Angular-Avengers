var app = angular.module('app',[]);

//Job Search API service
app.factory('jobSearchService', function($http){
  return{
    getListOfJobs: function(callback){
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
      }).success(callback);
    } // end getListOfJobs method
  }; // end return
});

// Google Map API service
app.factory('googleMap', function($http){
  var centerLatLng = {lat: 39.099727, lng: -94.578567};
  mapOptions = {
    center: centerLatLng,
    zoom: 4
  };

  return{
    plotData: plotData
  };

  //function to add the markers on the map for the jobs returned by the job search api
  function plotData(jobs){

    // empty array of infoWindows
    var infoWindow = [];
    // var allResultsList = job;
    // console.log(allResultsList);


    var markers = jobs.map(function(job) {
      var locationList = job.MatchedObjectDescriptor.PositionLocation;

      locationList.map(function(location){
        var lat = location.Latitude;
        var lng = location.Longitude;
        var position = {
          lat: lat,
          lng: lng
        };
        // console.log(position);
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

    var mapOtions = {
      center: centerLatLng,
      zoom: 10
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOtions);
  } // end function plotData





});


// main controller 
app.controller('MainController', function($scope, jobSearchService, googleMap){
  jobSearchService.getListOfJobs(function(data){
    // returns the first 25 results
    $scope.allResultsList = data.SearchResult.SearchResultItems;
    console.log($scope.allResultsList);

    // call to the google service plot jobs location on map
    googleMap.plotData($scope.allResultsList);
  });
});
