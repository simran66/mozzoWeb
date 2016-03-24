'use strict';

describe('Directive: locationLookup', function () {

  // load the directive's module and view
  beforeEach(module('angularTestApp'));
  beforeEach(module('components/locationLookup/locationLookup.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<location-lookup></location-lookup>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the locationLookup directive');
  }));
});
