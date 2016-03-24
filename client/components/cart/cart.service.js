'use strict';

angular.module('angularTestApp')
  .factory('cart', function () {
    
    var userCart=[];
    var OrderBill={};

    function calculateTax(place){
      for(var i=0; i< place.tax_types.length; i++){
      console.log("fraction  ", parseFloat(place.tax_types[i].fraction) )
      console.log("TOTAL BASE", OrderBill.totalBaseAmount)
       OrderBill.taxAmount += (parseFloat(place.tax_types[i].fraction) * OrderBill.totalBaseAmount);
      }
      console.log("TAX AMOUNT", OrderBill.taxAmount  )
    }

    function calculateBill(place){
      OrderBill={'items':[], 'totalBaseAmount':0, 'taxes':[], 'totalAmount':0, 'taxAmount': 0}
      for(var i=0; i< userCart.length; i++) {
        OrderBill.items.push(userCart[i]);
        OrderBill.totalBaseAmount+=(userCart[i].priceForItem*userCart[i].quantity);
      }
      calculateTax(place);
      OrderBill.totalAmount= OrderBill.taxAmount + OrderBill.totalBaseAmount;
    }

     function checkIfItemInCart(itemToCheck){
        for(var i=0; i< userCart.length; i++){
            if(userCart[i].id==itemToCheck.id && itemToCheck.isHalf == userCart[i].isHalf){
              return i
            }
        }
        return null
    }

    return {

      addToCart:function(item,place){
      var checkBool = checkIfItemInCart(item);
       if(checkBool !== null && checkBool>= 0){
           userCart[checkBool].quantity += 1
       }else{
        item.quantity = 1;
        userCart.push(item)
       }
      calculateBill(place);
       return userCart

      },

      deleteItemFromCart:function(itemToDelete,place){

        var checkBool = checkIfItemInCart(itemToDelete);
       if(checkBool !== null && checkBool>= 0){
           userCart[checkBool].quantity -= 1;
           
           if(userCart[checkBool].quantity == 0)
            userCart.splice(checkBool, 1);
       }

       calculateBill(place);
       return userCart

      },

      removeItemFromCart:function(itemToRemove, place){
        var checkBool = checkIfItemInCart(itemToRemove);
        if(checkBool !== null && checkBool>= 0){
            userCart.splice(checkBool, 1);
       }
       calculateBill(place);
       return userCart
      },

      getCart:function(){
        console.log("CART", userCart)
        return userCart
      },


      emptyCart:function(){
        userCart=[];
        OrderBill={};
      },

      getOrderBill:function(){
        return OrderBill
      }
      
    };
  });
