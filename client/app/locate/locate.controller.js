'use strict';

angular.module('angularTestApp')
  .controller('LocateCtrl', function ($scope, $state, $stateParams, getPlaces, location, reverseGeocoder, $log, getOutletMenu, $mdBottomSheet,$mdSidenav, $mdDialog) {
   location.get(angular.noop, angular.noop);

// var formatLatLng= function(){
//  var latlng = [];
//   latlng.push($scope.latitude.toFixed(0))
//   latlng.push($scope.longitude.toFixed(0))
//  var latLngString = latlng.join(',');
//  return latLngString
// }


// var reverseGeoCode = function(loc){
// reverseGeocoder.geocode(loc.current)
// .then(function(results) {
// console.log("results in func", results)
// $scope.options = results;
// }, $log.error);
// }



 
$scope.getPlaces = function(place, loc){
      getPlaces.places(place, loc)
      .then(function(data){
        console.log("data final is", data)
        $scope.places = data;
      })
}
 

var init = function(){
  $scope.showSearch = false;
  $scope.currentPage = 1;
  $scope.pageSize = 7;
  $scope.getPlaces ();

}
init();

$scope.selectOutlet = function(selectedPlaceId){
  console.log("setting id", selectedPlaceId)
getOutletMenu.setId(selectedPlaceId);
$state.go('outletMenu')
}

  });
