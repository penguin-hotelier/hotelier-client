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


    /**
     * Staff login
     * @return {Object} Returns staff member's information 
     */
    vm.login = function login() {
      console.log('get login info');
    };
  }

}());
