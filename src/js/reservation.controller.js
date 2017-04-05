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
    console.log('get here?');
    vm.reservations = ReservationService.getReservations();
  }

}());
