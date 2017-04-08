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
        vm.reservations = ReservationService.getReservations();
        vm.storedReservation = false; // initialize as falsey

        // error message and state
        // for Controller to send to the View as necessary
        vm.errorMessage = null;
        vm.hasError = false;

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

        /**
         * [getGuestById asks service for guest Object matching an ID value]
         * @param  {Object} id [ID String for a guest]
         * @return {Object}    [good result: return guest Object to the caller]
         * @return {void}      [bad result: return nothing]
         */
        function getGuestById(id) {
            if (typeof(id) !== 'string' || id.length === 0) {
                return;
            }

            vm.storedReservation = Service.getGuestById(id);
            console.log('guest object is', vm.storedReservation);
            if (!vm.storedReservation) {
                vm.hasError = true;
                vm.errorMessage =
                    'Sorry, guest was not returned from the database';
            }
        }
    }
}());
