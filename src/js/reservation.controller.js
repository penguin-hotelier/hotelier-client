(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationController', ReservationController);

    ReservationController.$inject = ['$state', 'ReservationService'];

    /**
     * [ReservationController constructor]
     * @param {Object} ReservationService [inject dependenc(ies)]
     */
    function ReservationController($state, ReservationService) {
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
                  console.log('new reservation is: ', vm.storedReservation);

                  console.log('guestId is', vm.storedReservation.guestId);
                  // get the reservation data based on the id
                  getSingle(vm.storedReservation.guestId)
                      .then(function handleResIdData(resIdData){
                          vm.reservationDetail = resIdData;
                          console.log('vm.reservationDetail is'. vm.reservationDetail);
                          // load the view-reservation template into index.html
                          $state.go('view-reservation');
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
         * [getSingle obtains details for a reservation]
         * @param  {String} id [ID of a single reservation]
         * @return {void}      [returns no matter if it ran ok or not]
         */
        vm.getSingle = function getSingle(id) {
            // basic validation of form Object
            if (!id || id.length === 0 ||
                typeof(newRes) !== 'string') {
                    vm.hasError = true;
                    vm.errorMessage =
                        'Sorry, invalid reservation id provided';
                    return;
            }
            // call the Service for the reservation detail
            ReservationService.getSingleRes(id)
                .then(function handleResData(idData){
                    vm.reservationDetail = idData;
                    console.log('new reservationDetail is: ', vm.reservationDetail);
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
    }
}());
