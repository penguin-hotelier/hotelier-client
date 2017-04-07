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
          vm.errorMessage = 'Sorry, invalid reservation information provided';
          return;
        }

      // basic data validation
      // Sun Jan 01 2017 00:00:00 GMT-0500 (EST)

      console.log('checkinDate for 1/1/2017 is ', newRes.checkinDate);
      // if (newRes.checkinDate)
      let testDate = new Date(newRes.checkinDate);
      console.log('testDate is ', testDate);



      ReservationService.makeReservation(newRes);
    };

  }

}());
