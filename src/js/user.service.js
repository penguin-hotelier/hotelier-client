(function() {
  'use strict';
  
  angular.module('hotelier')
    .factory('UserService', UserService);
  UserService.$inject = ['$http'];

  /**
   * Creates a new UserService
   * @param {Function}  $http The service for making ajax calls
   * @return {Object}         The service's API methods
   */
  function UserService($http) {
    let token;

    /**
     * Returns the authorization token
     * @return {String} The individual token for a user
     */
    function getToken() {
      return token;
    }

    /**
     * Allows user to log out of system
     * @return {void}
     */
    function logout() {
      token = null;
    }

    /**
     * Log in staff with the API given user provided credentials
     * @param {String} email
     * @param {String} password
     * @return {Promise}
     */
    function login(email, password) {
      return $http({
        url: 'https://penguin-hotelier-api.herokuapp.com/api/Staffs/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'email': email,
          'password': password
        }
      })
      .then(function handleResponse(responseObj) {
        console.log('handleResponse', responseObj);
        token = responseObj.data.id;
      });
    }
    return {
      login: login,
      getToken: getToken,
      logout: logout
    };
  }
}());
