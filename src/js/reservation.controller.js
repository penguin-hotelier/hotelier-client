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

          ReservationService.makeReservation(newRes)
              .then(function handleResData(resData){
                  vm.storedReservation = resData;
                  console.log('resData is', resData);
              })
              .catch(function handleErrors(errResponse) {
                  console.warn(errResponse);
                  vm.hasError = true;
                  if (errResponse.status === 401) {
                      vm.errorMessage = 'We need to log in first';
                  } else if (errResponse.status === 404) {
                      vm.errorMessage = 'URL fails to resolve to the API site';
                  } else if (errResponse.status === 422) {
                      vm.errorMessage = 'Unexpected reservation data provided';
                  } else {
                      vm.errorMessage = 'Server error!';
                  }
              });
      };
    }
}());
