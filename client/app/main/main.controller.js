'use strict';

angular.module('angularTestApp')
  .controller('MainCtrl', function ($scope, $state, $stateParams, getPlaces, location, reverseGeocoder, $log, getOutletMenu, $mdBottomSheet,$mdSidenav, $mdDialog) {
  
$scope.getPlaces = function(place, loc){
      getPlaces.places(place, loc)
      .then(function(data){
        console.log("data final is", data)
        $scope.places = data;
      })
}
    
  });
