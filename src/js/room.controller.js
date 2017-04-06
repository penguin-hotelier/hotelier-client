(function() {
    'use strict';

    angular
        .module('hotelier')
        .controller('RoomController', RoomController);

    RoomController.$inject = [];
    function RoomController() {
        var vm = this;

        vm.rooms = [];
    }
})();
