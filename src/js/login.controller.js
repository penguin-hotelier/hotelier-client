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
      UserService.login(loginInfo.email, loginInfo.password)
        .then(function sendUserHome() {
          $state.go('home');
        });
    };
  }

}());
