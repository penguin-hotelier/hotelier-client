(function() {
    'use strict';

    angular.module('hotelier')
        .factory('UserService', UserService);
    UserService.$inject = ['$http'];

    /**
    * Creates a new UserService
    * @param {Function}  $http The service for making ajax calls
    * @return {Object}         The service's API methods
    */
    function UserService($http) {
        let token = localStorage.getItem('token');

        /**
        * Returns the authorization token
        * @return {String} The individual token for a user
        */
        function getToken() {
            return token;
        }

        /**
        * Returns true or false based on whether a staff member is logged in.
        * @return {Boolean} True if logged in.
        */
        function isLoggedIn() {
            return !!getToken();
        }

        /**
        * Allows user to log out of system
        * @return {void}
        */
        function logout() {
            token = null;
            localStorage.removeItem('token');

            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Staffs/logout',
                method: 'post',
                headers: {
                    'Authorization': UserService.getToken()
                }
            })
            .then(function handleResponse(response) {
                console.info(response, 'we want to know what lives in here');
            });
        }

        /**
        * Log in staff with the API given user provided credentials
        * @param {String} email
        * @param {String} password
        * @return {Promise}
        */
        function login(email, password) {

            if (typeof(email) !== 'string' || typeof(password) !== 'string' ||  !email.length || !password.length) {
                return Promise.reject('Valid credentials are required to login');
            }

            return $http({
                url: 'https://penguin-hotelier-api.herokuapp.com/api/Staffs/login',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'email': email,
                    'password': password
                }
            })
            .then(function handleResponse(responseObj) {
                if ( responseObj.status > 199 && responseObj.status < 300 ) {
                    token = responseObj.data.id;
                    localStorage.setItem('token', token);
                }

            });
        }
        return {
            login: login,
            getToken: getToken,
            logout: logout,
            isLoggedIn: isLoggedIn
        };
    }
}());
