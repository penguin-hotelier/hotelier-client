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

    vm.login = function login() {
      console.log('get login info');
    };
  }

}());
