'use strict';

angular.module('angularTestApp')
  .controller('OutletMenuCtrl', function ($scope, getOutletMenu, _, getPlaces, $state, cart) {
    $scope.message = 'Hello';
    var place;


    
    var init= function(){
         var id = getOutletMenu.getId();
         var res = getOutletMenu.getMenu().get({place: id});
         console.log("resource is", res)
         place = getPlaces.getAll().get({id: id});
         console.log("returned places", place)
         res.$promise.then(function(data){
             $scope.categories = data.results;
             console.log("menu", $scope.categories);
             
         })
    }

    init();

    // var checkIfItemInCart=function(itemToCheck){
    //     for(var i=0; i<$scope.cart.length; i++){
    //         if($scope.cart[i].id==itemToCheck.id && itemToCheck.isHalf == $scope.cart[i].isHalf){
    //           return i
    //         }
    //     }
    //     return null
    // }

   $scope.checkForOptions = function(itemToPush){
       $scope.itemSelected = itemToPush;
   }

    $scope.addItemToCart = function(itemToPush, quantity, option){
        if(!$scope.cart)
          $scope.cart = [];
         
        var item = angular.copy(itemToPush)
         if(parseFloat(option) == 0.5){
            item.isHalf = true;
            item.priceForItem = itemToPush.price_half
        }else{
            item.isHalf = false;
            item.priceForItem = itemToPush.price;
        }

         delete item.image;
         delete item.description;
         delete item.price;
         delete item.price_half;

       // var checkBool = checkIfItemInCart(item);
       // if(checkBool !== null && checkBool>= 0){
       //     $scope.cart[checkBool].quantity += quantity || 1
       // }else{
       //  item.quantity = quantity || 1;
       //  $scope.cart.push(item)
       // }
       // $scope.calculateBill();

       $scope.cart = cart.addToCart(item,place);
       $scope.OrderBill= cart.getOrderBill();
    };


    $scope.deleteItemFromCart = function(itemToDelete){
        
       // var checkBool = checkIfItemInCart(itemToDelete);
       // if(checkBool !== null && checkBool>= 0){
       //     $scope.cart[checkBool].quantity -= 1;
           
       //     if($scope.cart[checkBool].quantity == 0)
       //      $scope.cart.splice(checkBool, 1);
       // }

       // $scope.calculateBill();

       $scope.cart = cart.deleteItemFromCart(itemToDelete,place);
      $scope.OrderBill= cart.getOrderBill();

    };

    $scope.removeItemFromCart=function(itemToRemove){
       // var checkBool = checkIfItemInCart(itemToRemove);
       //  if(checkBool !== null && checkBool>= 0){
       //      $scope.cart.splice(checkBool, 1);
       // }
       // $scope.calculateBill();

       $scope.cart = removeItemFromCart(itemToRemove,place)
      $scope.OrderBill= cart.getOrderBill();

    }


    $scope.emptyCart = function(){
        // $scope.cart=[];
        // $scope.OrderBill={};
        $scope.cart=cart.emptyCart();
        $scope.OrderBill={};
    };

    // var calculateTax=function(){
    //   console.log("place tax", place)
    //   for(var i=0; i< place.tax_types.length; i++){
    //   console.log("fraction  ", parseFloat(place.tax_types[i].fraction) )
    //   console.log("TOTAL BASE", $scope.OrderBill.totalBaseAmount)
    //   $scope.OrderBill.taxAmount += (parseFloat(place.tax_types[i].fraction) * $scope.OrderBill.totalBaseAmount);
    //   }
    //   console.log("TAX AMOUNT", $scope.OrderBill.taxAmount  )
    // }
    // $scope.calculateBill = function(){
        
    //   $scope.OrderBill={'items':[], 'totalBaseAmount':0, 'taxes':[], 'totalAmount':0, 'taxAmount': 0}
    //   for(var i=0; i<$scope.cart.length; i++) {
    //     $scope.OrderBill.items.push($scope.cart[i]);
    //     console.log("price for item", angular.copy($scope.cart[i].priceForItem))
    //     console.log("quantity", angular.copy($scope.cart[i].quantity))
    //     $scope.OrderBill.totalBaseAmount+=($scope.cart[i].priceForItem*$scope.cart[i].quantity);
    //   }
    //   calculateTax();
    //   $scope.OrderBill.totalAmount= $scope.OrderBill.taxAmount + $scope.OrderBill.totalBaseAmount;
    //   console.log("CALCULATED BILL", $scope.OrderBill.totalAmount)
    // }

    $scope.proceedToCheckOut=function(){
      $state.go('orderOptions');
    }

  });
