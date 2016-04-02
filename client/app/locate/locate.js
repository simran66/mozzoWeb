'use strict';

angular.module('angularTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locate', {
        url: '/locate/:lat/:lng',
        templateUrl: 'app/locate/locate.html',
        controller: 'LocateCtrl',
        authenticate: false
      });
  });
