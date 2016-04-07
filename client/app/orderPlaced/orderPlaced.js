'use strict';

angular.module('angularTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orderPlaced', {
        url: '/orderPlaced',
        templateUrl: 'app/orderPlaced/orderPlaced.html',
        controller: 'OrderPlacedCtrl',
        authenticate: true


      });
  });