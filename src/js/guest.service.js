(function() {
  'use strict';

  anguler.module('hotelier')
    .factory('GuestService', GuestService);

  GuestService.$inject = ['$http'];

  function GuestService($http) {

    function createGuest(guest) {
      return $http({
        url: 'https://penguin-hotelier-api.herokuapp.com/api/Guests',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'fullName': '',
          'phoneNumber': '',
          'email': ''
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    return {
      createGuest: createGuest
    };
  }



}());
