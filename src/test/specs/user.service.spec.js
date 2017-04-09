(function() {
    'use strict';

    let expect = chai.expect;

    describe('login service', function() {
        let UserService;
        let mockUserService = {};

        beforeEach(module('hotelier'));

        beforeEach(module(function($provide) {
            $provide.value('UserService', UserService);
        }));

        beforeEach(inject(function(_UserService_) {
            UserService = _UserService_;

            mockUserService.getToken = function getToken() {
                return '7y3h68j940k30mr7j4rr3w96h37g60';
            };
        }));

        describe('login', function() {
            it('should fail if a string is not provided', function() {
                let returnValue = UserService.login({email: 'jordan@hotelier.com', password: 'foobar'});
                expect(returnValue.then).to.be.a('function');
                expect(returnValue.catch).to.be.a('function');

                returnValue
                .then(function() {
                    done('We should not resolve with a bad argument');
                })
                .catch(function handleError(err) {
                    //TODO add assertions on the err- see shopular notes
                    done();
                });
            });
        });

    });
}());
