(function() {
  'use strict';

  angular.module('hotelier', ['ui.router'])
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routerConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
      .state({
        name: 'login',
        url: '/login',
        templateUrl: 'views/login.template.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
      .state({
        name: 'home',
        url: '/',
        templateUrl: 'views/WIP-home.template.html'
      });
  }

}());
