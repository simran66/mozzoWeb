'use strict';

describe('Service: getOutletMenu', function () {

  // load the service's module
  beforeEach(module('angularTestApp'));

  // instantiate service
  var getOutletMenu;
  beforeEach(inject(function (_getOutletMenu_) {
    getOutletMenu = _getOutletMenu_;
  }));

  it('should do something', function () {
    expect(!!getOutletMenu).toBe(true);
  });

});
