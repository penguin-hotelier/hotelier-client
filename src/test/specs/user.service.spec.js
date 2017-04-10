(function() {
    'use strict';

    let expect = chai.expect;

    describe('login service', function() {
        let UserService;
        let $httpBackend;

        beforeEach(module('hotelier'));

        beforeEach(inject(function(_$httpBackend_, _UserService_) {
            $httpBackend = _$httpBackend_;
            UserService = _UserService_;

            $httpBackend
                .whenPOST('https://penguin-hotelier-api.herokuapp.com/api/Staffs/login')
                .respond({
                    'created':'2017-04-09T19:38:01.521Z',
                    'id':'QQN70y319v5RbuogyQypYnLk0DnAxGv1dVem6U9v5fWT1FAPzjzdwxjlNVH4gOPl',
                    'ttl':1209600,
                    'userId':'58dfeeaa81a0f30011e7d2f0'
                });
        }));

        afterEach(function() {
            localStorage.removeItem('token');
        });

        describe('login', function() {
            it('should work if an email and password are provided', function(done) {
                let returnValue = UserService.login('jordan@hotelier.com', 'foobar');
                expect(returnValue.then).to.be.a('function');
                expect(returnValue.catch).to.be.a('function');

                returnValue
                .then(function() {
                    expect(localStorage.getItem('token')).to.equal('QQN70y319v5RbuogyQypYnLk0DnAxGv1dVem6U9v5fWT1FAPzjzdwxjlNVH4gOPl');
                    done();
                })
                .catch(function handleError(err) {
                    done(err);
                });
                $httpBackend.flush();
            });

        });

    });
}());
