(function() {
  'use strict';

  angular.module('hotelier')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'LoginService'];

  /**
   * Handles the staff login
   * @return {void}
   */
  function LoginController() {
    let vm = this;

    vm.getLoginInfo = function getLoginInfo() {
      console.log('get login info');
    };
    vm.getLoginInfo();
  }

}());
