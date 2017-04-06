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

    vm.makeReservation = function makeReservation(newRes) {
      console.log('ctrl.makeRes called?, newRes is', newRes);
      ReservationService.makeReservation(newRes);
    };

  }

}());
