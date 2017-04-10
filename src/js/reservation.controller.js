(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationController', ReservationController);

    ReservationController.$inject = ['ReservationService'];

    /**
     * [ReservationController constructor]
     * @param {Object} ReservationService [inject dependenc(ies)]
     */
    function ReservationController(ReservationService) {
        let vm = this;
        vm.newReservation = {};
        vm.reservations = [];
        vm.storedReservation = false; // initialize as falsey

        // error message and state
        // for Controller to send to the View as necessary
        vm.errorMessage = null;
        vm.hasError = false;


        vm.getReservations = function getReservations() {
          ReservationService.getReservations()
            .then(function handleReservationData(reservations) {
              vm.reservations = reservations;
            })
            .catch(function handleErrors(errResponse) {
                console.warn(errResponse);
                vm.hasError = true;
                if (errResponse.status === 404) {
                    vm.message = 'Sorry, the API URL was incorrect';
                } else {
                    vm.message = 'Server error';
                }
            });
        };

        /**
         * [makeReservation description]
         * @param  {Object} newRes [JS Object containing new reservation info]
         * @return {void}
         */
        vm.makeReservation = function makeReservation(newRes) {
          // basic validation of form Object
          if (!newRes || newRes.length === 0 ||
            Array.isArray(newRes) || typeof(newRes) !== 'object') {
              vm.hasError = true;
              vm.errorMessage =
                  'Sorry, invalid reservation information provided';
              return;
            }

            ReservationService.makeReservation(newRes);
        };
    }
}());
