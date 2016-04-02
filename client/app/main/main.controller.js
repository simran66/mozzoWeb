'use strict';

angular.module('angularTestApp')
  .controller('MainCtrl', function ($scope, $state, $stateParams, getPlaces, location, reverseGeocoder, $log, getOutletMenu, $mdBottomSheet,$mdSidenav, $mdDialog) {
  
$scope.getPlaces = function(place, loc){
	console.log("CALLED", place);
	$scope.selectedPlace = place
      getPlaces.places(place, loc)
      .then(function(data){
        console.log("data final is", data)
        console.log("LOC IS", loc)
        $scope.places = data;
      })
}

$scope.getResults = function(){

	 if($scope.selectedPlace)
	 $state.go('locate', {lat:$scope.selectedPlace.lat, lng: $scope.selectedPlace.lng})
     else
     $state.go('locate')
}
    
  });
