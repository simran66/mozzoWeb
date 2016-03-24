'use strict';

describe('Service: getPlaces', function () {

  // load the service's module
  beforeEach(module('angularTestApp'));

  // instantiate service
  var getPlaces;
  beforeEach(inject(function (_getPlaces_) {
    getPlaces = _getPlaces_;
  }));

  it('should do something', function () {
    expect(!!getPlaces).toBe(true);
  });

});
