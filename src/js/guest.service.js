(function() {
    'use strict';

    angular.module('hotelier')
        .factory('GuestService', GuestService);

    GuestService.$inject = ['$http', 'UserService'];

    /**
     * GuestService constructor. Used for api interaction related to guests
     * @param {Object} $http        Angular service that performs ajax calls
     * @param {Object} UserService  Angular service used for api interaction related to staff
     */
    function GuestService($http, UserService) {

        /**
         * Creates a new guest object
         * @param  {Object} newGuest An object that contains all necessary guest info: name,
         *                           email, and phone number
         * @return {Promise}         The api response (promise object)
         */
        function createGuest(newGuest) {
            if(typeof(newGuest) !== 'object') {
              return Promise.reject('New guest object was invalid');
            }

            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Guests',
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': UserService.getToken()
                },
                data: angular.toJson({
                  fullName: newGuest.fullName,
                  phone: newGuest.phone,
                  email: newGuest.email
                })
            })
            .then(function handleResponse(responseObj) {
                return responseObj.data;
            });
        }

        /**
         * Returns all guests from the API
         * @return {Promise}
         */
        function getGuests() {
            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Guests',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': UserService.getToken()
                }
            }).then(function handleResponse(responseObj) {
                return responseObj.data;
            });
        }


      return {
        createGuest: createGuest,
        getGuests: getGuests
      };
    }
}());
