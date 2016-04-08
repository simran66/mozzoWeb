'use strict';

angular.module('angularTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userFeedback', {
        url: '/userFeedback',
        templateUrl: 'app/userFeedback/userFeedback.html',
        controller: 'UserFeedbackCtrl'
      });
  });