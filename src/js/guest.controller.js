(function() {
    'use strict';

    angular.module('hotelier')
        .controller('GuestController', GuestController);

    GuestController.$inject = ['GuestService'];

    /**
    * GuestController constructor
    * @param {Object} GuestService The service singleton that facilitates the
    *                              user's entry of personal info.
    * @return {void}
    */
    function GuestController(GuestService) {
        let vm = this;

        vm.newGuest = {};

        /**
        * Adds a new guest and uses GuestService to communicate the data
        * @param  {Object} newGuest An object that contains all necessary guest info: name,
        *                           email, and phone number
        * @return {void}
        */
        vm.createGuest = function createGuest(newGuest) {
            GuestService.createGuest(newGuest);
        };
    }
}());
