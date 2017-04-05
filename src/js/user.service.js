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


    /**
     * Allows staff to log in
     * @return {Promise}
     */
    function login() {

      return $http({
        url: 'https://penguin-hotelier-api.herokuapp.com/api/Staffs/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'email': '',
          'password': ''
        }
      })
      .then(function handleResponse(responseObj) {
        console.log(responseObj.status);
        return responseObj.data;
      });

    }

    return {
      login: login
    };

  }
}());
