  (function() {
  'use strict';

  angular.module('hotelier')
    .controller('GuestController', GuestController);

  GuestController.$inject = ['GuestService'];

  /**
   * Creates GuestController's constructor
   *
   */
  function GuestController(GuestService) {
    let vm = this;
    console.log('Is guestcontroller running?');

    vm.newGuest = {};

    /**
     * Adds a new guest and uses GuestService
     * to communicate the data
     * @return
     */
    vm.createGuest = function createGuest(newGuest) {
      GuestService.createGuest(newGuest);


    };
  }

}());
