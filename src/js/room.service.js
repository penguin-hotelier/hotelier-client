(function() {
  'use strict';

  angular
    .module('hotelier')
    .factory('RoomService', RoomService);

  RoomService.$inject = ['$http'];
  function RoomService($http) {

    function getAll() {
      return $http({
        url: 'http://penguin-hotelier-api.herokuapp.com/api/Rooms'
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
