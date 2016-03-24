'use strict';

describe('Controller: OutletMenuCtrl', function () {

  // load the controller's module
  beforeEach(module('angularTestApp'));

  var OutletMenuCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OutletMenuCtrl = $controller('OutletMenuCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
