  (function() {
  'use strict';

  angular.module('hotelier')
    .controller('GuestController', GuestController);

  GuestController.$inject = ['GuestService'];

  /**
   * Creates GuestController's constructor
   *
   */
  function GuestController() {
    let vm = this;

    vm.newGuest = {};

    /**
     * Adds a new guest and uses GuestService
     * to communicate the data
     * @return
     */
    vm.createGuest = function createGuest() {

      GuestService.createGuest() {
        
      }


    };
  }

}());
