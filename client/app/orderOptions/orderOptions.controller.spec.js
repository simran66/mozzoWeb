'use strict';

describe('Controller: OrderOptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularTestApp'));

  var OrderOptionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderOptionsCtrl = $controller('OrderOptionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
