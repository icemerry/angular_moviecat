(function(angular) {
  "use strict";

  var module = angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.services.http']);

  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:type/:page', {
      templateUrl: '/app/movie_list/view.html',
      controller: 'Movie_ListController'
    });
  }]);

  module.controller('Movie_ListController', ['$scope', '$routeParams', '$route', 'HttpService', function($scope, $routeParams, $route, HttpService) {
    var page = parseInt($routeParams.page);
    var count = 8;
    var start = (page - 1) * count;

    $scope.totalCount = 0;
    $scope.pageCount = 0;
    $scope.currentPage = page;
    $scope.subjects = [];
    $scope.isloaded = false;
    $scope.title = '';

    HttpService.jsonp('http://api.douban.com/v2/movie/' + $routeParams.type, {
      count: count,
      start: start
    }, function(data) {
      $scope.totalCount = data.total;
      $scope.subjects = data.subjects;
      $scope.isloaded = true;
      $scope.pageCount = Math.ceil($scope.totalCount / count);
      $scope.title = data.title;
      $scope.$apply();
    });

    $scope.goto = function(page) {
      if (page <= 1) {
        page = 1;
        $scope.disabledPrev = true;
      } else if (page >= $scope.pageCount) {
        page = $scope.pageCount;
        $scope.disabledNext = true;
      }
      $scope.disabledPrev = false;
      $scope.disabledNext = false;
      $route.updateParams({
        page: page
      })
    };

  }]);

})(angular);