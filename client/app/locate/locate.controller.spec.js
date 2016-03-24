'use strict';

describe('Controller: LocateCtrl', function () {

  // load the controller's module
  beforeEach(module('angularTestApp'));

  var LocateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LocateCtrl = $controller('LocateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
