'use strict';

angular.module('angularTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orderOptions', {
        url: '/orderOptions',
        templateUrl: 'app/orderOptions/orderOptions.html',
        controller: 'OrderOptionsCtrl',
        authenticate: true

      });
  });
