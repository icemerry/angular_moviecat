(function(angular) {
  'use strict';

  var module = angular.module('moviecat.movie_detail', ['$ngRoute']);

  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:id', {
      templateUrl: '/app/movie_detail/view.html',
      controller: 'Movie_DetailController'
    });
  }]);

  module.controller('Movie_DetailController', ['$scope', '$routeParams', function($scope, $routeParams) {

  }]);

})(angular);