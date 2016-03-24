'use strict';

angular.module('angularTestApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngResource',
  'ngMaterial', 
  'ngMessages', 
  'underscore',
  'satellizer'
])
  .config(function ($stateProvider, $authProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');
    $httpProvider.interceptors.push('authInterceptor');

     $locationProvider.html5Mode(true);
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

     $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('yellow');

    $mdThemingProvider.theme('login')
      .primaryPalette('brown')
      .accentPalette('yellow');

    //   $authProvider.facebook({
    //   clientId: '1256802200999873',
    //   responseType: 'token'
    // });

$authProvider.loginUrl = 'https://www.mozzobytes.com/api/auth/login/';
$authProvider.signupUrl = 'https://www.mozzobytes.com/api/auth/registration/';

$authProvider.facebook({
  name: 'facebook',
  url: 'https://www.mozzobytes.com/api/auth/facebook/',
  authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
  redirectUri:'http://localhost:9000/',
  requiredUrlParams: ['display', 'scope', 'access_token', 'code'],
  scope: ['email'],
  scopeDelimiter: ',',
  display: 'popup',
  type: '2.0',
  clientId: '1256802200999873',
  popupOptions: { width: 580, height: 400 }
});

$authProvider.google({
  url: 'https://www.mozzobytes.com/api/auth/google/',
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  //redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
  redirectUri:'http://localhost:9000/',
  scope: ['profile', 'email'],
  scopePrefix: 'openid',
  scopeDelimiter: ' ',
  requiredUrlParams: ['scope'],
  optionalUrlParams: ['display'],
  clientId: '780212582471-nf39a4v5259fksea1tfibula6edd3hdo.apps.googleusercontent.com',
  display: 'popup',
  type: '2.0',
  popupOptions: { width: 452, height: 633 }
});

    
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });
