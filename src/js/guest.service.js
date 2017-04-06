(function() {
  'use strict';

  angular.module('hotelier')
    .factory('GuestService', GuestService);

  GuestService.$inject = ['$http', 'UserService'];

  function GuestService($http, UserService) {
    console.log('Creating a Guest Service');

    function createGuest(newGuest) {
      console.log('This is the new Guest', newGuest);

      let jsonObj = angular.toJson(newGuest);
      console.log('jsonObj', jsonObj);

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
        console.log(responseObj.data);
        return responseObj.data;
      });
    }

    return {
      createGuest: createGuest
    };
  }



}());
