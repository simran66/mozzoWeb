'use strict';

angular.module('angularTestApp')
  .factory('getPlaces', function ($resource, location, reverseGeocoder, $log, $q) {
  	var places=[];
    var obj={};

    var formatLatLng= function(lat, lng){
      var latlng = [];
  latlng.push(lat.toFixed(0))
  latlng.push(lng.toFixed(0))
      var latLngString = latlng.join(',');
        return latLngString
   }

   function reverseGeoCode(loc){
reverseGeocoder.geocode(loc.current)
.then(function(results) {
console.log("results in func", results)
//$scope.options = results;
return results
});
}
 
   // return {
    	obj.getAll = function(){
    		places = $resource('https://www.mozzobytes.com/api/places/:id/', {
          id:'@id'
        })
    		return places
    	},

    	obj.returnPlaces = function(){
    		return places
    	},

      obj.places = function(place, loc){
        var deferred = $q.defer();
         if(place){
       var latitude = place.geometry.location.lat();
       var longitude = place.geometry.location.lng();
      var latLngString = formatLatLng(latitude, longitude);
        var res = obj.getAll().get({dist:'1000', point:latLngString});
       res.$promise.then(function(data){
           deferred.resolve(data.results)
        })
       }else{
      location.get(function(){
     location.ready(function() {
      var latitude = location.current.latitude;
      var longitude = location.current.longitude;
       var options = reverseGeoCode(location)  
       var latLngString = formatLatLng(latitude, longitude);
        var res = obj.getAll().get({dist:'1000', point:'28,77'});
        res.$promise.then(function(data){
           deferred.resolve(data.results)
        })
      });
   })
      
  }
     console.log("defered promise", deferred)
     return deferred.promise
  }

      return obj

})
