'use strict';

angular.module('angularTestApp')
  .factory('getOutletMenu', function ($resource) {
  	var placeId;
     return{
     	getMenu: function(){
           return $resource('https://www.mozzobytes.com/api/categories/')
     	}, 

     	getId: function(){
          return placeId
     	}, 

     	setId:function(id){
          placeId = id
     	}


     } 
  });
