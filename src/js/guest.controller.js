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
        vm.storedGuest = false; // initialize as false

        /**
        * Adds a new guest and uses GuestService to communicate the data
        * @param  {Object} newGuest An object that contains all necessary guest info: name,
        *                           email, and phone number
        * @return {void}
        */
        vm.createGuest = function createGuest(newGuest) {
            GuestService.createGuest(newGuest);
        };
        function getGuestById(id) {
            if (typeof(id) !== 'string' || id.length === 0) {
                return;
            }
            GuestService.getGuestById(id)
                .then(function handleResponse(responseObj) {
                    vm.storedReservation = responseObj;
                })
                .catch(function handleErr(error) {
                    if (error.status === 401) {
                        vm.hasError = true;
                        vm.errorMessage =
                            'Please log in and try again';
                    } else if (error.status === 404) {
                        vm.hasError = true;
                        vm.errorMessage =
                            'Could not find that guest by the id provided';
                    } else {
                        vm.hasError = true;
                        vm.errorMessage = 'Unknown error from server';
                    }
                });
        }
    }
}());
