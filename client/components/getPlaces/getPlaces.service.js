'use strict';

angular.module('angularTestApp')
  .factory('getPlaces', function ($resource) {
  	var places=[];
    return {
    	getAll:function(){
    		places = $resource('https://www.mozzobytes.com/api/places/:id', {
          id:'@id'
        })
    		return places
    	},

    	returnPlaces:function(){
    		return places
    	}

    }
    
  });
