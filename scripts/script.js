var app = angular.module('app',[]);

  app.controller('JobSearch', function($scope, $http){
    //debugger
    var page = 0;
    $http({
      url: 'https://data.usajobs.gov/api/search',
      params: {
        JobCategoryCode: 2210,
        PositionLocation: 'Atlanta, Ga'
      },
      headers: {
        //'User-Agent': 'allenhthompson1@gmail.com',
        'Authorization-Key': 'MfbLK4LehC6CQvAg3U9nr2Y0nBS5IHnMJjPK+KuoWbM='
      }
    }).success(function(data) {
      debugger
      $scope.resultList = data.SearchResult.SearchResultItems;
      console.log(data);
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
    });
