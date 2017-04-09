(function() {
    'use strict';

    angular.module('hotelier')
    .controller('NavController', NavController);

    NavController.$inject = ['UserService'];
    function NavController(UserService) {
        let vm = this;

        /**
        * Allows the user to logout
        * @return {Void}
        */
        vm.logout = function logout() {
            UserService.logout();
        };

        /**
        * Determines if a user is presently logged in.
        * @return {Boolean} True if logged in.
        */
        vm.loggedIn = function loggedIn() {
            return !!UserService.isLoggedIn();
        };
    }
}());
