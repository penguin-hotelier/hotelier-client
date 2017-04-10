(function() {
    'use strict';

    let expect = chai.expect;

    describe('guest service', function() {
        let GuestService;

        beforeEach(module('hotelier'));

        before(inject(function(_GuestService_) {
            GuestService = _GuestService_;
        }));

        describe('getting all guests', function() {
            it('should be able to give us an array of guests', function() {
                let result = GuestService.getGuests();
                expect(result).to.be.an('array');
            });
        });

        describe ('adding new guests', function() {
            it('should be able to create a new guest with correct info', function() {
                expect(GuestService.getGuests().length).to.equal(0);
                GuestService.createGuest({
                    fullName: 'John Doe',
                    email: 'john@hey.com',
                    phone: '7563453456'
                });
                let guests = GuestService.getGuests();
                expect(guests.length).to.equal(1);
                expect(guests[0].fullName).to.equal('John Doe');
                expect(guests[0].email).to.equal('john@hey.com');
                expect(guests[0].phone).to.equal('7563453456');
            });

        });

    });

}());
