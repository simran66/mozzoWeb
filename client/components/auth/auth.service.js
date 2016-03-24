'use strict';

angular.module('angularTestApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user,withfaceBookGoogle, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('https://www.mozzobytes.com/api/auth/login/', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          console.log("SUCCESSLOGIN",data)
          $cookieStore.put('token', data.key);
          //currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user,callback) {
        var cb = callback || angular.noop;

        // return User.save(user,
        //   function(data) {
        //     $cookieStore.put('token', data.token);
        //     currentUser = User.get();
        //     return cb(user);
        //   },
        //   function(err) {
        //     this.logout();
        //     return cb(err);
        //   }.bind(this)).$promise;

       var deferred = $q.defer();

        console.log("USER", user)
    $http.post('https://www.mozzobytes.com/api/auth/registration/', {
        email: user.email,
        username:user.name,
        password1: user.password,
        password2:user.password
      }).then(function(data){
          console.log("succes data", data)
           $cookieStore.put('token', data.key);
            deferred.resolve(data);
      },function(err){
            console.log("err", err);
      })
                return deferred.promise; 
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
