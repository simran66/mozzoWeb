'use strict';

angular.module('angularTestApp')
  .controller('LocateCtrl', function ($scope, $state, $stateParams, getPlaces, location, reverseGeocoder, $log, getOutletMenu, $mdBottomSheet,$mdSidenav, $mdDialog, cart) {
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

   $scope.placeLatLng = {lat:$stateParams.lat , lng: $stateParams.lng};


 
$scope.getPlaces = function(place, loc){
  console.log("place in location", place)
  console.log("loc in location", loc)
    //$scope.selectedPlace = place

   if((!place || (typeof (place == 'undefined'))) && ($stateParams.lat != '' || null || undefined && $stateParams.lng != '' || null || undefined)){
    place= {};
    place.lat = $stateParams.lat ;
    place.lng =  $stateParams.lng;
  }

      getPlaces.places(place, loc)
      .then(function(data){
        console.log("data final is", data)
        if(place)
        $state.go('locate', {lat:place.lat , lng:place.lng })
        $scope.places = data;
      })
}
 

var init = function(){
  $scope.showSearch = false;
  $scope.currentPage = 1;
  $scope.pageSize = 7;
  $scope.getPlaces ();
  cart.emptyCart();

}
init();

$scope.selectOutlet = function(selectedPlaceId){
  console.log("setting id", selectedPlaceId)
getOutletMenu.setId(selectedPlaceId);
$state.go('outletMenu', {outletId: selectedPlaceId})

}

  });
