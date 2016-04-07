'use strict';

angular.module('angularTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('outletMenu', {
        url: '/outletMenu/:outletId/menu',
        templateUrl: 'app/outletMenu/outletMenu.html',
        controller: 'OutletMenuCtrl',
        authenticate: true
      });
  });
