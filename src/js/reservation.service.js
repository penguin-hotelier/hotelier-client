(function() {
  'use strict';

  angular.module('hotelier')
  .factory('ReservationService', ReservationService);

  ReservationService.$inject = ['$http'];

  /**
   * [Instantiates a ReservationService singleton]
   * @param  {Function} $http [AngularJS service that makes AJAX calls]
   * @return {Object}         [returns ReservationService methods]
   */
  function ReservationService($http) {
    /**
     * [returns all reservations from data API]
     * @return {Promise}
     */
    function getReservations() {
      return $http({
        url: 'https://penguin-hotelier-api.herokuapp.com/api/Reservations',
        method: 'get'
      }).then(function handleResponse(response) {
        console.log(response.status);
        return response.data;
      });
    }

    return {
      getReservations: getReservations
    };

  }
}());
