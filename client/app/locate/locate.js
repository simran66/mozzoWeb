'use strict';

angular.module('angularTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locate', {
        url: '/locate',
        templateUrl: 'app/locate/locate.html',
        controller: 'LocateCtrl',
        authenticate: false
      });
  });
