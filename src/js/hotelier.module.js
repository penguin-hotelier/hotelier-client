(function() {
    'use strict';

    angular.module('hotelier', ['ui.router'])
    .config(routerConfig)
    // .run(setupAuthCheck);
;
    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('', '/');

        $urlRouterProvider.otherwise('/not-found');

        $stateProvider
        .state({
            name: 'home',
            url: '/',
            templateUrl: 'views/home.template.html',
            controller: 'NavController',
            controllerAs: 'navCtrl'
        })
        .state({
            name: 'login',
            url: '/login',
            templateUrl: 'views/login.template.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .state({
            name: 'create-guest',
            url: '/create-guest',
            templateUrl: 'views/create-guest.template.html',
            controller: 'GuestController',
            controllerAs: 'guestCtrl',
            restricted: true
        })
        .state({
            name: 'make-reservation',
            url: '/make-reservation',
            templateUrl: 'views/make-reservation.template.html',
            controller: 'ReservationController',
            controllerAs: 'resCtrl',
            restricted: true
        })
        .state({
            name: '404-not-found',
            url: '/not-found',
            templateUrl: 'views/not-found.template.html'
        });

        setupAuthCheck.$inject = ['$rootScope', '$state', 'UserService'];

        function setupAuthCheck($rootScope, $state, UserService) {
            // event handler here
            //   $on()  ==> addEventListener()
            $rootScope.$on('$stateChangeStart', function checkLoginStatus(eventObj, toState) {
                if (toState.restricted && !UserService.isLoggedIn()) {
                    eventObj.preventDefault();
                    $state.go('login');
                }
                else {
                    $state.go(toState);
                }
            });
        }
    }
}());
