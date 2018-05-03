var key = 'sk_test_1e60d83e1029dd5d42e4e9649dfc7c084cee6719';
var Paystack = require('../index')(key.toString());
var expect = require('chai').expect;
var allBanks = Paystack.all_banks;
console.log(key);

describe('Paystack Transfer', function(){

    it("Should create a transfer recipient", function (done) {
        Paystack.transfer.createRecipient("Oluwaleke", "Me", "0221859505", allBanks.guaranty_trust_bank, {})
            .then(function (body) {
                expect(body).to.have.property('data');
                expect(body.data).to.have.property('type');
                expect(body.data).to.have.property('name');
                expect(body.data).to.have.property('description');
                expect(body.data).to.have.property('createdAt');
                expect(body.data).to.have.property('updatedAt');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("It should return a list of all recipients", function (done) {
        Paystack.transfer.listRecipients()
            .then(function (body) {
                expect(body).to.have.property('data');
                expect(body).to.have.property('message');
                expect(body).to.have.property('meta');
                expect(body).to.have.property('status');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should initiate a transfer", function (done) {
        Paystack.transfer.initiateSingle("balance", "Calm down", 200000, 'RCP_1t4o61bbb3sc6q2') //todo replace with gotten one
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should fetch a transfer by its code", function (done) {
        Paystack.transfer.fetchTransfer('TRF_65jqzyoqclutyud')
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should list all my transfers", function (done) {
        Paystack.transfer.listTransfers()
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                expect(body).to.have.property('data');
                expect(body).to.have.property('meta');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should finalize my transfer", function (done) {

        Paystack.transfer.finalize('TRF_65jqzyoqclutyud', '792537')
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should initiate bulk transfer", function (done) {
        Paystack.transfer.initiateBulk("balance", [
            {
                "amount": 50000,
                "recipient": "RCP_1t4o61bbb3sc6q2"
            },
            {
                "amount": 70000,
                "recipient": "RCP_1t4o61bbb3sc6q2"
            }
        ]).then(function (body) {
            expect(body).to.have.property('status');
            expect(body).to.have.property('message');
            done();
        })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });


    it("Should check my Paystack account balance", function (done) {

        Paystack.transfer.checkBalance()
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should resend OTP for a particular transaction to phone number", function (done) {

        Paystack.transfer.resendOtp('TRF_65jqzyoqclutyud')
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });


    it("Should disable OTP for future transfers", function (done) {

        Paystack.transfer.disableOtp()
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should finalize disabling of OTP", function (done) {

        Paystack.transfer.finalizeOtpDisable('777605')
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should enable OTP", function (done) {

        Paystack.transfer.enableOtp()
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });


});