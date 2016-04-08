'use strict';

angular.module('angularTestApp')
  .controller('HomeCtrl', function ($scope, $interval, $location, $window) {


$scope.redirectToApp= function(){
   $window.location.href="http://espresso.mozzobytes.com/";
}
  });
