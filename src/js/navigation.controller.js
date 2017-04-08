(function() {
    'use strict';

    angular.module('hotelier')
    .controller('NavController', NavController);

    NavController.$inject = ['UserService'];
    function NavController(UserService) {
        let nc = this;

        /**
        * Allows the user to logout
        * @return {Void}
        */
        nc.logout = function logout() {
            UserService.logout();
        };

        /**
        * Determines if a user is presently logged in.
        * @return {Boolean} True if logged in.
        */
        nc.loggedIn = function loggedIn() {
            return !!UserService.isLoggedIn();
        };
    }
}());
