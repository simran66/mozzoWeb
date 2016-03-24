'use strict';

angular.module('angularTestApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $auth, $rootScope) {
    $scope.user = {};
    $scope.errors = {};

    // $scope.login = function(form) {
    //   $scope.submitted = true;

    //   if(form.$valid) {
    //     Auth.login({
    //       email: $scope.user.email,
    //       password: $scope.user.password
    //     })
    //     .then( function() {
    //       // Logged in, redirect to home
    //       $location.path('/');
    //     })
    //     .catch( function(err) {
    //       $scope.errors.other = err.message;
    //     });
    //   }
    // };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };



  

    $scope.login = function() {
      $auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function(response) {
         // toastr.success('You have successfully signed in!');
         $auth.setToken(response.data.key)
         console.log($auth.getToken())
         console.log("logged In", response)
          $location.path('/');
        })
        .catch(function(error) {
          //toastr.error(error.data.message, error.status);
        });
    };

 $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(response){
         console.log("response", response)
      })
      .catch(function(err){
       console.log("err", err)
      })
    };


    

  });
