'use strict';

angular.module('angularTestApp')
  .directive('locationLookup', function () {
    // return {
    //   templateUrl: 'components/locationLookup/locationLookup.html',
    //   restrict: 'EA',
    //   link: function (scope, element, attrs) {
    //   }
    // };


    return {
      restrict: 'E',
      require: '?ngModel',
      templateUrl: 'components/locationLookup/locationLookup.html',
      scope: {
        changelocation:"="
      },
      link: function(scope, iElement, iAttrs, model) {

        scope.limitTo = scope.$eval(iAttrs.limitTo) || 15;
        console.log("attrs", iAttrs)
        scope.callback = scope.$eval(iAttrs.callback);
        scope.results = [];

        console.log("finding elemtn", angular.element(iElement.find('input')))

        // Generate a DOM elment for Google Places Service
        var elem = document.createElement('div');
            elem.setAttribute('id', scope.ID);

        // Setup Google Places Service
        var googlePlacesService = new google.maps.places.PlacesService(iElement[0].appendChild(elem));

        // Clear query and results
        scope.clear = function() {
          scope.results = [];
        };
                      console.log("MODEL IS ", model);


        // Pick A Location
        scope.pickLocation = function(location) {
          console.log("location in pick location", location)
          // Get details for the selected location
          googlePlacesService.getDetails({
            reference: location.reference
          }, function(place, status) {

            scope.$apply(function() {

              var locData = {
                name: location.terms[0].value,
                description: location.description,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
              };

              // Update model
              model.$setViewValue(locData);
              console.log("MODEL IS ", model);
              console.log("locdata", locData)

   


              var locationString = (" ").concat(locData.description);
              var updatedElement = angular.element(iElement.find('input'));
              updatedElement[0].value = locationString;
              model.$render();
              console.log("updated eleemn", updatedElement)
                        scope.results = [];
              console.log("callback", scope.callback)
              scope.changelocation(place, location);
              scope.callback && scope.callback(locData);


        console.log("I ELEMENT AFTER UPDATINH", iElement)

            });
          });
        };
      }
    }
  
  })
 .directive('locationPredictions', [
  '$log',
    'location',
    'reverseGeocoder',
  function($log, location, reverseGeocoder) {
    return {
      restrict: 'E',
      scope: { results: '=' },
      //template: '<div id="custom-search-input"><div class="input-group col-md-12"><input type="text" class="  search-query form-control" placeholder="Search" /> </div> </div>',
      template: '<md-input-container md-colspan="8" class="md-input-focused"><label>Location</label><input></md-input-container>',
      link: function(scope, iElement, iAttrs) {

        // Setup Google Auto-complete Service
        var googleMapsService = new google.maps.places.AutocompleteService();
        var geocoder = new google.maps.Geocoder();
        var el = angular.element(iElement.find('input'));

        // Fetch predictions based on query
        var fetch = function(query) {
          googleMapsService.getPlacePredictions({
            input: query
          }, fetchCallback);
        };

        if (navigator.geolocation) {
          var pos;
       navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
        var latlng = new google.maps.LatLng(pos.lat, pos.lng);


      
      geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        console.log("result", results)
        el.val(results[1].formatted_address)
        console.log("ELEMENT", el)

      }
    }
  })

       // location.ready(function() {
       //  console.log("iN FUCN")
       //  console.log("LATLNG", location.current)
       //    reverseGeocoder.geocode(location.current)
       //      .then(function(results) {
       //        console.log("results in func", results)
       //        el.val(results[1].formatted_address)
       //        scope.options = results;
       //      }, $log.error);
       //  });

           
      });

    }


        // Display predictions to the user
        var fetchCallback = function(predictions, status) {

          if (status !== google.maps.places.PlacesServiceStatus.OK) {

            scope.$apply(function() {
              scope.results = [];
            })

            return;

          } else {

            scope.$apply(function() {
              scope.results = predictions;
            })
          }
        };


        // Refresh on every edit
        el.on('input', function() {
          var query = el.val();

          if (query && query.length >= 3) {

            fetch(query);

          } else {

            scope.$apply(function() {
              scope.results = [];
            });
          }
        });

      }
    }
  }
]);


