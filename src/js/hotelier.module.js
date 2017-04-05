(function() {
  'use strict';

  angular.module('hotelier', ['ui.router'])
    .config(routerConfig);

  routingConfig.$inject = ['$stateProvider'];

  function routerConfig($stateProvider) {
    $stateProvider
      .state({
        name: 'login',
        url: '/login',
        templateUrl: 'views/login.template.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
      .state({
        name: 'make-reservation',
        url: '/make-reservation',
        templateUrl: 'views/make-reservation.template.html',
        controller: 'ReservationController',
        controllerAs: 'resCtrl'
      });
  }

}());
