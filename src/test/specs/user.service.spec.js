(function() {
    'use strict';

    let expect = chai.expect;

    describe('login service', function() {
        let UserService;

        beforeEach(module('hotelier'));

        beforeEach(inject(function(_UserService_) {
            UserService = _UserService_;
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
                    done();
                });
            });
        });
        
    });
}());
