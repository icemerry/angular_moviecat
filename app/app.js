(function(angular) {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('moviecat', [
      'ngRoute',
      'moviecat.movie_list'
    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({ redirectTo: '/in_theaters/1' });
    }])
    .controller('NavController', ['$scope', '$location', function($scope, $location) {
      $scope.$location = $location;
      $scope.focusat = '/in_theaters';
      $scope.$watch('$location.path()', function(now, old) {
        if (now.startsWith('/in_theaters')) {
          $scope.focusat = '/in_theaters';
        } else if (now.startsWith('/coming_soon')) {
          $scope.focusat = '/coming_soon';
        } else if (now.startsWith('/top250')) {
          $scope.focusat = '/top250';
        }
      });

    }]);
})(angular);