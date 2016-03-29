'use strict';

angular.module('angularTestApp')
  .controller('OrderOptionsCtrl', function ($scope, cart, $http, $state) {
   // $scope.message = 'Hello';

   var init=function(){
   	$scope.cart= cart.getCart();
   	$scope.OrderBill=cart.getOrderBill();
    $scope.date = new Date();
    $scope.user={'serviceType': 0, 'payableAmount': $scope.OrderBill.totalAmount, 'paymentType': 0}
   }

   init();

   var userModel = function(){
    var userDetails = {};
    userDetails.name = $scope.user.name;
    userDetails.phoneNumber = $scope.user.phone;
    userDetails.emailId = $scope.user.email ;
    userDetails.paymentOption =$scope.user.paymentType ;
    userDetails.serviceType = $scope.user.serviceType;
    userDetails.paidAmount = $scope.user.payableAmount ;
    return userDetails;
   }

   $scope.placeOrder= function(){
    var user= userModel();
    console.log("cart", $scope.cart)
    $http.post('https://www.mozzobytes.com/api/orders/', {
        'items': $scope.cart,
        'status': 0,
        'payment_name': 'Cash',
        'created': new Date(),
        'payment': 0,
         'user': 2, 
         'place': 1

    }).success(function(response){
          console.log("response posting order", response);
          $state.go('orderPlaced');

    }).error(function(err){
          console.log("error",err)

     $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Oops, Something went wrong')
        .textContent('Please try again later! See you :) ')
        .ariaLabel('somethign went wrong')
        .ok('Got it!')
    );

    })

   }
  // $scope.options = {
  //     'key': 'rzp_test_6jrlct369p16DH',
  //     'amount': '100',
  //     'name': 'drtfygv',
  //     'description': 'Pay for Order #2323',
  //     'image': '',
  //     'handler': function (transaction) {
  //       $scope.transactionHandler(transaction);
  //     },
  //     'prefill': {
  //       'name': 'sim',
  //       'email': 'simrankaur@sizzlelabs.com',
  //       'contact': '9013875965'
  //     }
  //   };
  //  $scope.makePayment=function(){
  //   console.log("OPTIIONS", $scope.options);
  //     var rzp1 = new Razorpay($scope.options);
  //     rzp1.open();
  //  }
  });
