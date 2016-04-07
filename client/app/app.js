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
  'satellizer',
'angularUtils.directives.dirPagination',
'ngAnimate',
'ui.bootstrap',
'ui.bootstrap.position',
'ui.bootstrap.timepicker',
'dnTimepicker',
'ngStorage',
'ngCurtain'
])
  .config(function ($stateProvider,  $resourceProvider, $authProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');
    $httpProvider.interceptors.push('authInterceptor');

     $locationProvider.html5Mode(true);
      $resourceProvider.defaults.stripTrailingSlashes = false;

    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

     $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('light-blue');

    $mdThemingProvider.theme('altTheme')
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
   requiredUrlParams: ['display', 'scope'],
   scope: ['email'],
   scopeDelimiter: ',',
   display: 'popup',
  type: '2.0',
  //clientId: '1256802200999873',
  clientId:'1481166418851439',
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

  .run(function ($rootScope, $location, Auth, $auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      // Auth.isLoggedInAsync(function(loggedIn) {
      //   if (next.authenticate && !loggedIn) {
      //     event.preventDefault();
      //     $location.path('/login');
      //   }
      // });

    if(!$auth.isAuthenticated() && next.authenticate){
       event.preventDefault();
         $location.path('/login');
    }
    });
  })

  .directive('animateOnChange', function($animate,$timeout) {
  return function(scope, elem, attr) {
      scope.$watch(attr.animateOnChange, function(nv,ov) {
        if (nv!=ov) {
          elem.addClass('animated zoomIn');
        $timeout(function() {
          elem.removeClass('animated zoomIn');
        }, 1000); 
      
   }
})
    }
  })
// .directive('animateElement', ['$animate','$timeout',
//     function ($animate, $timeout) {
//         return function (scope, elem, attrs) {
//             elem.bind("mouseover", function(hover) {
//               if (hover) 
//                   $animate.addClass(elem, 'animated zoomIn');
//               else 
//                   $animate.removeClass(elem, 'animated zoomIn');   
//             }
//           }

// }]);

.directive('animateElement', function ($animate, $timeout) {
    return function (scope, element, attrs) {
      console.log("element directive")
         element.bind("mouseover", function(hover) {
        if (hover) {
          //$animate.addClass(element, 'animated zoomIn');
          element.addClass('animated pulse selected');
        } 
         $timeout(function() {
          element.removeClass('animated pulse selected');
        }, 1000); 
        
      })   
    }
  })
// .directive('animateRandom', function ($animate, $timeout, $animateCss) {
//     return function (scope, element, attrs) {
     
//  var id = Math.floor((Math.random() * 5)+ 1);
//   var el = "#\\".concat(id)

//  element[0].querySelector(el).addClass('animated zoomIn')



    
//   }
// })
