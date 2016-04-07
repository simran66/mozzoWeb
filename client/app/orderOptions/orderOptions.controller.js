'use strict';

angular.module('angularTestApp')
  .controller('OrderOptionsCtrl', function ($scope, $auth, $filter, cart, $http, $state, $mdDialog) {
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


    var data = JSON.stringify({
  "items": $scope.cart,
  "status_name": "Placed",
  "payment_name": "Cash",
  "deleted": null,
  "comment": "",
  "location": null,
  "seat": null,
  "status": 0,
  "status_reason": null,
  "payment": 0,
  "rating": 0,
  "feedback": null,
  "place": 1
});
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.status)
        if (this.status === 200 ||  201 || 202) { 
    console.log(this.responseText);
    cart.emptyCart();
         $state.go('orderPlaced');

  }
  }
});
xhr.open("POST", "https://www.mozzobytes.com/api/orders/");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");
xhr.setRequestHeader("authorization", 'Token '+ $auth.getToken());
xhr.send(data);
    // $http.post('https://www.mozzobytes.com/api/orders/', {
      
    //        "items":  [{
    //            "item": 3
    //        }],
    //        "status_name": "Placed",
    //        "payment_name": "Cash",
    //        "deleted": null,
    //        "comment": "",
    //        "location": null,
    //        "seat": null,
    //        "status": 0,
    //        "status_reason": null,
    //        "payment": 0,
    //        "rating": 0,
    //        "feedback": null,
    //        "place": 3

      
    // }).success(function(response){
    //       console.log("response posting order", response);
    //       cart.emptyCart();
    //       $state.go('orderPlaced');

    // }).error(function(err){
    //       console.log("error",err)

    //  $mdDialog.show(
    //   $mdDialog.alert()
    //     .parent(angular.element(document.querySelector('#popupContainer')))
    //     .clickOutsideToClose(true)
    //     .title('Oops, Something went wrong')
    //     .textContent('Please try again later! See you :) ')
    //     .ariaLabel('somethign went wrong')
    //     .ok('Got it!')
    // );

    // })

   }

  });
