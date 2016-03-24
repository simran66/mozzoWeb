'use strict';

angular.module('angularTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('outletMenu', {
        url: '/outletMenu',
        templateUrl: 'app/outletMenu/outletMenu.html',
        controller: 'OutletMenuCtrl',
        authenticate: false
      });
  });
