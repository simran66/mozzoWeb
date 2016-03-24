'use strict';

angular.module('angularTestApp')
  .controller('OrderOptionsCtrl', function ($scope, cart) {
   // $scope.message = 'Hello';

   var init=function(){
   	$scope.cart= cart.getCart();
   	$scope.OrderBill=cart.getOrderBill();
   }

   init();
  $scope.options = {
      'key': 'rzp_test_6jrlct369p16DH',
      'amount': '100',
      'name': 'drtfygv',
      'description': 'Pay for Order #2323',
      'image': '',
      'handler': function (transaction) {
        $scope.transactionHandler(transaction);
      },
      'prefill': {
        'name': 'sim',
        'email': 'simrankaur@sizzlelabs.com',
        'contact': '9013875965'
      }
    };
   $scope.makePayment=function(){
    console.log("OPTIIONS", $scope.options);
      var rzp1 = new Razorpay($scope.options);
      rzp1.open();
   }
  });
