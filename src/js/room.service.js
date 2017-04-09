(function() {
    'use strict';

    angular
    .module('hotelier')
    .factory('RoomService', RoomService);

    RoomService.$inject = ['$http'];

    /**
    * The RoomService to be used for Room API data
    * @param {Function} $http The angular ajax service
    * @return {Object} The service functions
    */
    function RoomService($http) {

        /**
        * Retrieves all rooms from the api
        * @return {Promise} The resolved Promise with the room data (array) as the only argument
        */
        function getAll() {
            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Rooms'
            })
            .then(function handleResponse(response) {
                return response.data;
            });
        }

        /**
         * Given a room's unique ID, this function finds the common room number
         * @param  {String} id Series of letters and numbers that uniquely identify a room
         * @return {Promise} The resolved Promise with the room's data as the only argument
         */
        function getRoomById(roomId) {
            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Rooms/' +
                roomId,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(function handleResponse(responseObj) {
                return responseObj.data;
            });
        }

        return {
            getAll: getAll,
            getRoomById: getRoomById
        };
    }
})();
