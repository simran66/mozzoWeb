'use strict';

angular.module('angularTestApp')
  .controller('LocateCtrl', function ($scope, $state, $stateParams, getPlaces, location, reverseGeocoder, $log, getOutletMenu, $mdBottomSheet,$mdSidenav, $mdDialog) {
   location.get(angular.noop, angular.noop);

var formatLatLng= function(){
 var latlng = [];
  latlng.push($scope.latitude.toFixed(0))
  latlng.push($scope.longitude.toFixed(0))
 var latLngString = latlng.join(',');
 return latLngString
}


var reverseGeoCode = function(loc){
reverseGeocoder.geocode(loc.current)
.then(function(results) {
console.log("results in func", results)
$scope.options = results;
}, $log.error);
}
 
$scope.getPlaces = function(place, loc){
  console.log("CALLED GET PLACES")
  if(place){
      $scope.latitude = place.geometry.location.lat();
      $scope.longitude = place.geometry.location.lng();
      var latLngString = formatLatLng();
       var res = getPlaces.getAll().get({dist:'1000', point:latLngString});
       res.$promise.then(function(data){
        console.log("data0", data.results)
        $scope.places = data.results;

       console.log("PLACES", $scope.places);
       console.log("options", $scope.options)

       })

  }else{
      location.get(function(){
     location.ready(function() {
      $scope.latitude = location.current.latitude;
      $scope.longitude = location.current.longitude;
      reverseGeoCode(location)  
       var latLngString = formatLatLng();
       var res = getPlaces.getAll().get({dist:'1000', point:'28,77'});
       res.$promise.then(function(data){
        console.log("data0", data.results)
        $scope.places = data.results;

       console.log("PLACES", $scope.places);
       console.log("options", $scope.options)

       })

      });
   })

  }

 

}
 

var init = function(){
  $scope.getPlaces ();
  $scope.showSearch = false;
}
init();

$scope.selectOutlet = function(selectedPlaceId){
getOutletMenu.setId(selectedPlaceId);
$state.go('outletMenu')
}

  });
