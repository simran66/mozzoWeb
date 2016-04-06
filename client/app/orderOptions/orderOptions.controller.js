'use strict';

angular.module('angularTestApp')
  .controller('OrderOptionsCtrl', function ($scope, $filter, cart, $http, $state, $mdDialog) {
   // $scope.message = 'Hello';

   var init=function(){
   	$scope.cart= cart.getCart();
   	$scope.OrderBill=cart.getOrderBill();
    $scope.date = new Date();
    $scope.currentTime = $filter('date')($scope.date, 'shortTime');
    if($scope.date.getHours() + 3 < '23')
    $scope.maxTime = $filter('date')($scope.date.setHours($scope.date.getHours() + 3) , 'shortTime');
     else
    $scope.maxTime = $filter('date')($scope.date.setHours($scope.date.getHours() + ('23:59' - $scope.date.getHours())) , 'shortTime');
    console.log("current", $scope.currentTime);
    console.log("max", $scope.maxTime)
    console.log("Macx compare", $scope.maxTime > '11:59 p.m')
    console.log($scope.currentTime > $scope.maxTime)
    console.log($scope.currentTime < $scope.maxTime)
   

    $scope.models = {
    time: new Date(),
    format: 'h:mm a',
    minTime: $scope.currentTime,
    maxTime: $scope.maxTime,
    step: '15'
}
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

   $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Place Order?')
          .textContent('Are you sure you would like to place your order')
          .ariaLabel('Place order confimation')
          .targetEvent(ev)
          .ok('Place!')
          .cancel('Cancel!');
    $mdDialog.show(confirm).then(function() {
      $scope.placeOrder();
      $mdDialog.hide();

    }, function() {
      $mdDialog.hide();
    });
  };

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
          cart.emptyCart();
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
