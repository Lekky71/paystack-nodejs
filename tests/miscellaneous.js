var key = 'sk_test_1e60d83e1029dd5d42e4e9649dfc7c084cee6719';
var Paystack = require('../index')(key.toString());
var expect = require('chai').expect;
var allBanks = Paystack.all_banks;
console.log(key);

describe('Paystack Miscellaneous', function () {
    it('Should list all banks', function (done) {
        Paystack.miscellaneous.listBanks()
            .then(function (body) {
                console.log(body);
                expect(body).to.have.property('data');
                expect(body).to.have.property('message');
                expect(body).to.have.property('status');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });
});