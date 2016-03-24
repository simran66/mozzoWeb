'use strict';

angular.module('angularTestApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $state, $auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.signup = function() {
      $auth.signup({email: $scope.user.email,
        username: $scope.user.name,
        password1: $scope.user.password,
        password2: $scope.user.password
      })
        .then(function(response) {
          console.log("res", response)
          $auth.setToken(response.data.key);
          console.log("token set", $auth)
          console.log($auth.getToken())
          $location.path('/');
          //toastr.info('You have successfully created a new account and have been signed-in');
        })
        .catch(function(response) {
         // toastr.error(response.data.message);
         console.log("res", response)
        });
    };


    // $scope.register = function(form) {
    //   $scope.submitted = true;

    //   if(form.$valid) {
    //     Auth.createUser({
    //       name: $scope.user.name,
    //       email: $scope.user.email,
    //       password: $scope.user.password
    //     })
    //     .then( function() {
    //       // Account created, redirect to home
    //       $location.path('/');
    //     })
    //     .catch( function(err) {
    //       err = err.data;
    //       $scope.errors = {};

    //       // Update validity of form fields that match the mongoose errors
    //       angular.forEach(err.errors, function(error, field) {
    //         form[field].$setValidity('mongoose', false);
    //         $scope.errors[field] = error.message;
    //       });
    //     });
    //   }
    // };

    

  });
