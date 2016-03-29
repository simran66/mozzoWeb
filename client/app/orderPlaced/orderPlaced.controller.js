'use strict';

angular.module('angularTestApp')
  .controller('OrderPlacedCtrl', function ($scope, $timeout, $state, $mdDialog) {
    //$scope.message = 'Hello';


$scope.startTimeOut= function(){
  console.log("called")
    $timeout(function() {
      $scope.lessThanSixty= false;
      console.log("timed out");
      $state.go('outletMenu');
    }, 60*1000);

}

    var init= function(){
    	$scope.lessThanSixty = true;
      $scope.startTimeOut();
    }


init();
    $scope.cancelOrder=function(){
var confirm=$mdDialog.confirm()
          .title('Uh Oh !')
          .textContent('Are you sure you would like to cancel your order?')
          .ariaLabel('Cancel order confirmation')
          .ok('Confirm')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      $state.go('main')
    }, function() {
         $scope.startTimeOut();
    });
  };
    


  });
