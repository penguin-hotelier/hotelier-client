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

        /**
         * [makeReservation creates a new reservation]
         * @param  {Object} newRes [new reservation Object]
         * @return {Promise}
         */
        function makeReservation(newRes) {
            if (typeof(newRes) !== 'object') {
              return Promise.reject('New reservation object was invalid');
            }
            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Reservations',
                method: 'post',
                headers: {
                    'Content-Type': 'application/JSON',
                    'Authorization': UserService.getToken()
                },
                data: angular.toJson({
                    checkinDate: newRes.checkinDate,
                    checkoutDate: newRes.checkoutDate,
                    numberOfGuests: newRes.numberOfGuests,
                    guestId: newRes.guestId,
                    roomId: newRes.roomId
                })
            }).then(function handleResponse(response) {
                return response.data;
            });
        }

        /**
         * [getSingleRes obtains a reservation object]
         * @param  {String} id [ID for a single reservation]
         * @return {Promise}
         */
        function getSingleReservation(id) {
            if (!id || typeof(id) !=='string' || id.length === 0) {
                return Promise.reject('Reservation id was invalid');
            }
            return $http({
                url:
                    'https://penguin-hotelier-api.herokuapp.com/api/Reservations/' + id,
                method: 'get',
                headers: {
                    'Content-Type': 'application/JSON',
                }
            }).then(function handleResponse(response){
                    return response.data;
            });

        }

        return {
            getReservations: getReservations,
            makeReservation: makeReservation,
            getSingleReservation: getSingleReservation
        };
    }
}());
