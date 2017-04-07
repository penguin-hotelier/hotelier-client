(function() {
    'use strict';

    angular.module('hotelier')
        .factory('ReservationService', ReservationService);

    ReservationService.$inject = ['$http', 'UserService'];

    /**
     * [Instantiates a ReservationService singleton]
     * @param  {Function} $http [AngularJS service that makes AJAX calls]
     * @return {Object}         [returns ReservationService methods]
     */
    function ReservationService($http, UserService) {
        /**
         * [returns all reservations from data API]
         * @return {Promise}
         */
        function getReservations() {
            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Reservations',
                method: 'get',
                headers: {
                    'Content-Type': 'application/JSON',
                    'Authorization': UserService.getToken()
              }
            }).then(function handleResponse(response) {
              return response.data;
            });
        }

        function makeReservation(newRes) {
            let jsonObj = angular.toJson(newRes);
            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Reservations',
                method: 'post',
                headers: {
                    'Content-Type': 'application/JSON',
                    'Authorization': UserService.getToken()
                },
                data: jsonObj
            }).then(function handleResponse(response) {
                return response.data;
            });
        }

        return {
            getReservations: getReservations,
            makeReservation: makeReservation
        };
    }
}());
