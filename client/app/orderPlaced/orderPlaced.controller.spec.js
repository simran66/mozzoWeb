'use strict';

describe('Controller: OrderPlacedCtrl', function () {

  // load the controller's module
  beforeEach(module('angularTestApp'));

  var OrderPlacedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderPlacedCtrl = $controller('OrderPlacedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
