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
        vm.storedRoom = {};

        RoomService.getAll()
            .then(function addDataOnScope(rooms) {
                vm.rooms = rooms;
            });
            // Ignoring catch for now since the result is
            // just a blank home page, not a terrible error

        function getRoomById(id) {
            if (typeof(id) !== 'string' || id.length === 0) {
                return;
            }
            RoomService.getRoomById(id)
                .then(function handleResponse(responseObj) {
                    vm.storedRoom = responseObj;
                })
                .catch(function handleErr(error) {
                    if (error.status === 401) {
                        vm.hasError = true;
                        vm.errorMessage =
                            'Please log in and try again';
                    } else if (error.status === 404) {
                        vm.hasError = true;
                        vm.errorMessage =
                            'Could not find that guest by the id provided';
                    } else {
                        vm.hasError = true;
                        vm.errorMessage = 'Unknown error from server';
                    }
                });
        }
    }
})();
