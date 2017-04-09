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
            let jsonObj = angular.toJson(newGuest);

            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Guests',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': UserService.getToken()
                },
                data: jsonObj
            })
            .then(function handleResponse(responseObj) {
                return responseObj.data;
            });
      }

      /**
       * [getGuestById returns Guest object matching an ID string]
       * @param  {String} id  [ID of guest]
       * @return {Promise}    [a promise handler must receive this]
       */
      function getGuestById(guestId) {
          return $http({
              url: 'https://penguin-hotelier-api.herokuapp.com/api/Guests/' +
                  guestId,
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
          createGuest: createGuest,
          getGuestById: getGuestById
      };
    }
}());
