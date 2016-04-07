'use strict';

angular.module('angularTestApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $auth, $rootScope, $state, $http) {
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
         $auth.setToken(response.data.key)
         $http.defaults.headers.common['Authorization'] = 'Token ' + $auth.getToken();
         $state.go('outletMenu', {outletId: 3})
//location.path('/signup')
        })
        .catch(function(error) {
          //toastr.error(error.data.message, error.status);
          console.log("er", error)
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
