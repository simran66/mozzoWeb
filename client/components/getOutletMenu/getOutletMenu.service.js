'use strict';

angular.module('angularTestApp')
  .factory('getOutletMenu', function ($resource) {
  	var placeId;
     return{
     	getMenu: function(){
           return $resource('https://www.mozzobytes.com/api/categories/')
     	}, 

     	getId: function(){
        console.log("returning place id", placeId)
          return placeId
     	}, 

     	setId:function(id){
          placeId = id
          console.log("place id set", placeId)
     	}


     } 
  });
