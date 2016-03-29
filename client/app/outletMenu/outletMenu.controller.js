'use strict';

angular.module('angularTestApp')
  .controller('OutletMenuCtrl', function ($scope, $mdToast, getOutletMenu, _, getPlaces, $state, cart, $mdDialog) {
    $scope.message = 'Hello';
    var place;
    var self = this;
    console.log("self is", self)

 var init= function(){
         var id = getOutletMenu.getId();
         var res = getOutletMenu.getMenu().get({place: id});
         $scope.items=[];
         console.log("resource is", res)
         $scope.userSelect={'selectedCategory': 0, 'topIndex': 0};
         console.log("id",id)
         place = getPlaces.getAll().get({id: id});
         console.log("returned places", place)
         res.$promise.then(function(data){
             $scope.categories = data.results;
             console.log("menu", $scope.categories);
             _.forEach($scope.categories, function(cat, i){
              _.forEach(cat.items, function(item){
                  $scope.items.push({itm: item, categoryIndex: i});
                  console.log("ITEMS", $scope.items)
              })
             })
             
         })

            //  $scope.categories= [{
            //   name: 'CaAT 1', 
            //   items: [{
            //      name: 'ITEM 1'
            //   }, {
            //      name: 'ITEM 2'

            //   }, {
            //      name: 'ITEM 3'

            //   }]
            //  },{name: 'CaAT 2', 
            //   items: [{
            //      name: 'ITEM 4'

            //   }, {
            //      name: 'ITEM 5'

            //   }]

            //  }, {name: 'CaAT 3', 
            //   items: [{
            //      name: 'ITEM 6'

            //   }, {
            //      name: 'ITEM 7'

            //   }]

            //  }, {
            //   name: 'CaAT 4', 
            //   items: [{
            //      name: 'ITEM 8'

            //   }, {
            //      name: 'ITEM 9'

            //   }, {
            //     name: 'ITEM 10'
  
            //   }]
            // }
            // ]

            //  _.forEach($scope.categories, function(cat, i){
            //   _.forEach(cat.items, function(item){
            //       $scope.items.push({itm: item, categoryIndex: i})
            //       console.log("ITEMS", $scope.items)
            //   })
            // });


    }

    init();

    $scope.proceedToCheckOut=function(){
      console.log("procedd to checjout", $scope.cart)
        if($scope.cart.length > 0){
          console.log("state go")
          $state.go('orderOptions');
        }
    }


   $scope.showToast = function(actionType){

    var messages =['Item has been added to cart', 'Item has been deleted from cart'];

     $mdToast.show(
                         $mdToast.simple()
                        .textContent(messages[actionType])                      
                        .hideDelay(2000)
                  );

   }
    // var checkIfItemInCart=function(itemToCheck){
    //     for(var i=0; i<$scope.cart.length; i++){
    //         if($scope.cart[i].id==itemToCheck.id && itemToCheck.isHalf == $scope.cart[i].isHalf){
    //           return i
    //         }
    //     }
    //     return null
    // }

   // $scope.checkForOptions = function(itemToPush){
   //     $scope.itemSelected = itemToPush;
   // }

   $scope.openTab=function(itemToPush, ev){
       $scope.itemSelected = itemToPush;
      $scope.showTabDialog(ev)
   }


   $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      templateUrl: 'app/outletMenu/itemOptions.tmpl.html',
     parent: angular.element(document.body),
      locals:{dataToPass: $scope.itemSelected},                
      controller: DialogController,
      targetEvent: ev,
      clickOutsideToClose:true
    }).then(function(answer) {
          //$scope.status = 'You said the information was "' + answer + '".';

          $scope.addItemToCart($scope.itemSelected.itm, 1, answer);
          $mdDialog.hide(answer);
        });
  };

 

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
        console.log("place is", place)
       $scope.cart = cart.addToCart(item,place);
       $scope.OrderBill= cart.getOrderBill();
       console.log("update cart", $scope.cart)

       $scope.showToast(0);
    };

    $scope.changeItemScroll=function(){
          var temp=0;
          if($scope.userSelect.topIndex !== $scope.userSelect.selectedCategory){
                for(var i=0; i<=$scope.userSelect.selectedCategory; i++)
                    var temp = temp + $scope.categories[$scope.userSelect.selectedCategory].items.length;
                $scope.userSelect.topIndex = temp;
          }     
    }


  
        $scope.$watch(function() {
                return $scope.userSelect.topIndex
         }, function(topIndex) {
          console.log("items", $scope.items)
          console.log("index", topIndex)
          console.log($scope.items[topIndex])
          if($scope.items.length > 0 && $scope.items[topIndex] !== null || undefined)
         $scope.userSelect.selectedCategory=$scope.items[topIndex].categoryIndex;
        });


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
      $scope.showToast(1);

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

    // $scope.proceedToCheckOut=function(){
    //   $state.go('orderOptions');
    // }

  });


function DialogController($scope, $mdDialog, dataToPass) {
  console.log("scope", $scope)
  console.log("data to pass", dataToPass)
  $scope.itemSelected = dataToPass.itm
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    console.log("selected choice is", answer)
    console.log("data to pass", dataToPass)
    $mdDialog.hide(answer);
  };
}
    
   