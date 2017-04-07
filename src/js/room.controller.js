(function() {
  'use strict';

  angular.module('hotelier')
    .controller('RoomController', RoomController);

  RoomController.$inject = ['RoomService'];

  /**
   * The Controller for the room information
   * @param {Object} RoomService The room service for accessing APi data
   * @return {void}
   */
  function RoomController(RoomService) {
    var vm = this;

    vm.rooms = [];

    RoomService.getAll()
      .then(function addDataOnScope(rooms) {
        vm.rooms = rooms;
      });
      // Ignoring catch for now since the result is just a blank home page, not a terrible error
  }
})();
