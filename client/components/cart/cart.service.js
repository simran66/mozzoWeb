'use strict';

angular.module('angularTestApp')
  .factory('cart', function ($localStorage) {
    
    var userCart=[];
    var OrderBill={};

    function calculateTax(place){
      if(place.tax_types){
      for(var i=0; i< place.tax_types.length; i++){
      console.log("fraction  ", parseFloat(place.tax_types[i].fraction) )
      console.log("TOTAL BASE", OrderBill.totalBaseAmount)
       OrderBill.taxAmount += (parseFloat(place.tax_types[i].fraction) * OrderBill.totalBaseAmount);
      }
      $localStorage.OrderBill= OrderBill
      console.log("TAX AMOUNT", OrderBill.taxAmount  )
    }
    }

    // function totalQuantityInCart(){
    //   var sumOfItems=0;
    //   for(var i=0; i< userCart.length; i++) {
    //       sumOfItems += userCart[i].quantity 
    //   }

    //   return sumOfItems;
    // }

    function calculateBill(place){
      OrderBill={'items':[], 'totalBaseAmount':0, 'taxes':[], 'totalAmount':0, 'taxAmount': 0, 'sumOfItems': 0}
      for(var i=0; i< userCart.length; i++) {
        OrderBill.items.push(userCart[i]);
        OrderBill.totalBaseAmount+=(userCart[i].priceForItem*userCart[i].quantity);
        OrderBill.sumOfItems += userCart[i].quantity;
      }
       if(place)
      calculateTax(place);
      OrderBill.totalAmount= OrderBill.taxAmount + OrderBill.totalBaseAmount;
      $localStorage.OrderBill= OrderBill
    }

     function checkIfItemInCart(itemToCheck){
        for(var i=0; i< userCart.length; i++){
            if(userCart[i].id==itemToCheck.id && itemToCheck.isHalf == userCart[i].isHalf || 'null'){
              return i
            }
        }
        return null
    }

    return {

      addToCart:function(item,place){
        console.log("item to add", item)
      var checkBool = checkIfItemInCart(item);
       if(checkBool !== null && checkBool>= 0){
           userCart[checkBool].quantity += 1
       }else{
        item.quantity = 1;
        userCart.push(item)
       }

       if(place)
      calculateBill(place);
       $localStorage.cart = userCart
       return userCart

      },

      deleteItemFromCart:function(itemToDelete,place){
         console.log("item to delete in function", itemToDelete)
        var checkBool = checkIfItemInCart(itemToDelete);
         console.log("checkBool", checkBool)
       if(checkBool !== null && checkBool>= 0){
          console.log("in if ")
           userCart[checkBool].quantity -= 1;
           
           if(userCart[checkBool].quantity == 0)
            userCart.splice(checkBool, 1);
          console.log("usercart", userCart);
       }
       if(place)
       calculateBill(place);
      $localStorage.cart = userCart
       return userCart

      },

      removeItemFromCart:function(itemToRemove, place){
        var checkBool = checkIfItemInCart(itemToRemove);
        if(checkBool !== null && checkBool>= 0){
            userCart.splice(checkBool, 1);
       }
       if(place)
       calculateBill(place);
       $localStorage.cart = userCart
       return userCart
      },

      getCart:function(){
        console.log("CART", userCart);
        if($localStorage.cart)
        userCart = $localStorage.cart;
        return userCart
      },

      sumOfItems: function(){
      var sumOfItems=0;
      for(var i=0; i< userCart.length; i++) {
          sumOfItems += userCart[i].quantity 
      }

      return sumOfItems;

      },


      emptyCart:function(){
        userCart=[];
        OrderBill={};
        $localStorage.cart = userCart;
        $localStorage.OrderBill = OrderBill;
      },

      getOrderBill:function(){
        OrderBill = $localStorage.OrderBill;
        return OrderBill
      }
      
    };
  });
