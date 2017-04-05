(function() {
  'use strict';

  angular.module('hotelier')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'UserService'];

  /**
   * Handles the staff login
   * @return {void}
   */
  function LoginController($state, UserService) {
    let vm = this;

    vm.loginInfo = {};

    /**
     * Staff login
     * @param {Object} loginInfo Staff login credentials
     * @return {void}
     */
    vm.login = function login(loginInfo) {
      console.log('get login info', loginInfo);
    };
  }

}());
