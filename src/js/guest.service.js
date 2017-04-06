(function() {
  'use strict';

  angular.module('hotelier')
    .factory('GuestService', GuestService);

  GuestService.$inject = ['$http', 'UserService'];

  function GuestService($http, UserService) {
    console.log('Creating a Guest Service');

    function createGuest(newGuest) {
      console.log('This is the new Guest', newGuest);
      return $http({
        url: 'https://penguin-hotelier-api.herokuapp.com/api/Guests',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getToken()
        },
        data: {
          'fullName': newGuest.fullName,
          'phone': newGuest.phone,
          'email': newGuest.email
        }
      })
      .then(function handleResponse(responseObj) {
        console.log(responseObj.data);
        return responseObj.data;
      });
    }

    return {
      createGuest: createGuest
    };
  }



}());
