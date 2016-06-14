var app = angular.module('app',[]);

app.controller('JobSearch', function($scope, $http){

  // job search api call
  $http({
    url: 'https://data.usajobs.gov/api/search',
    params: {
      JobCategoryCode: 2210,
      // LocationName: 'Atlanta, Georgia'
    },
    headers: {
      //'User-Agent': 'allenhthompson1@gmail.com',
      'Authorization-Key': 'MfbLK4LehC6CQvAg3U9nr2Y0nBS5IHnMJjPK+KuoWbM='
    }
  }).success(function(data) {
    $scope.resultList = data.SearchResult.SearchResultItems;
    console.log(data);
    //debugger
  });


  // google map api call
  var centerLatLng = {lat: 33.7490, lng: -84.3880};

  var mapOtions = {
    center: centerLatLng,
    zoom: 4
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOtions);

  //plot marker on the map
  var marker = new google.maps.Marker({
    // var locationList = job.MatchedObjectDescriptor.PositionLocation;
    locationList.map(function(){
      var lat = locationList.Longitude;
      var lng = locationList.Latitude;
    });

  });
});











  // $http.jsonp('https://jobs.github.com/positions.json?callback=JSON_CALLBACK',{
  //   params:{
  //     full_time: 'true',
  //     title: 'web devolper',
  //     // page: page,
  //     location: 'sf, ca'
  //   }
  // }).success(function(data){
  //
  //   $scope.data = data;
  //   //$scope.result = data.list;
  //   console.log(data);
  // });
