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
     *
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

    return {
      getAll: getAll
    };
  }
})();
