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


    /**
     * Staff login
     * @return {Object} Returns staff member's information 
     */
    vm.login = function login() {
      console.log('get login info');
    };
  }

}());
