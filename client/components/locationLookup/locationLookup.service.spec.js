'use strict';

describe('Service: locationLookup', function () {

  // load the service's module
  beforeEach(module('angularTestApp'));

  // instantiate service
  var locationLookup;
  beforeEach(inject(function (_locationLookup_) {
    locationLookup = _locationLookup_;
  }));

  it('should do something', function () {
    expect(!!locationLookup).toBe(true);
  });

});
