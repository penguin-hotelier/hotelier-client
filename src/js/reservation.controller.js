(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationController', ReservationController);

    ReservationController.$inject =
        ['$state', '$stateParams', 'ReservationService'];

    /**
     * [ReservationController constructor]
     * @param {Object} ReservationService [inject dependenc(ies)]
     */
    function ReservationController($state, $stateParams, ReservationService)  {
        let vm = this;
        vm.newReservation = {};
        vm.reservations = [];
        vm.storedReservation = false; // initialize as falsey
        vm.reservationDetail = {};

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
                  // update index.html with the view-reservation template
                  $state.go('view-reservation', { id: resData.id });
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

        /**
         * [getSingleReservation obtains details for a reservation]
         * @param  {String} id [ID of a single reservation]
         * @return {void}      [returns no matter if it ran ok or not]
         */
        vm.getSingleReservation = function getSingleReservation(id) {
            // basic validation of form Object
            if (!id || id.length === 0 ||
                typeof(id) !== 'string') {
                    vm.hasError = true;
                    vm.errorMessage =
                        'Sorry, invalid reservation id provided';
                    return;
            }
            // call the Service for the reservation detail
            ReservationService.getSingleReservation(id)
                .then(function handleResData(idData){
                    vm.reservationDetail = idData;
                })
                .catch(function handleErrors(errResponse) {
                    console.warn(errResponse);
                    vm.hasError = true;
                    if (errResponse.status === 401) {
                        vm.errorMessage =
                            'Please log in to get info on that id';
                    } else if (errResponse.status === 404) {
                        vm.errorMessage =
                            'URL fails to resolve to the API site';
                    } else if (errResponse.status === 422) {
                        vm.errorMessage = 'Unexpected reservation id';
                    } else {
                        vm.errorMessage = 'Server error!';
                    }
                });
        };

        // get reservation detail for templates that need it
        // such as view-reservation
        if ($stateParams.id) {
            vm.getSingleReservation($stateParams.id);
        }
    }
}());
