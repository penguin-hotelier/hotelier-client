(function() {
  'use strict';

  angular.module('hotelier', ['ui.router'])
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        name: 'create-guest',
        url: '/create-guest',
        templateUrl: 'views/create-guest.template.html',
        controller: 'GuestController',
        controllerAs: 'guestCtrl'
      });
  }

}());
