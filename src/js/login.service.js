(function() {
  'use strict';

  angular.module('hotelier')
    .factory('LoginService', LoginService);

  LoginService.$inject = ['$http'];

  /**
   * Creates a new LoginService
   * @param {Function}  $http The service for making ajax calls
   * @return {Object}         The service's API methods
   */
  function LoginService($http) {


    /**
     * Retrieves the staff's login info
     * @return {Promise}
     */
    function getsLoginInfo() {

      return $http({
        url: 'https://penguin-hotelier-api.herokuapp.com/api/Staffs/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'email': 'jordan@hotelier.com',
          'password': 'foobar'
        }
      })
      .then(function handleResponse(responseObj) {
        console.log(responseObj.status);
        return responseObj.data;
      });

    }

    return {
      getsLoginInfo: getsLoginInfo
    };

  }
}());
