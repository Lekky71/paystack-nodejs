var key = 'sk_test_1e60d83e1029dd5d42e4e9649dfc7c084cee6719';
var Paystack = require('../index')(key.toString());
var expect = require('chai').expect;
var allBanks = Paystack.all_banks;
console.log(key);

var customerCode = 'CUS_b1p584m7j0kbkpm';
var customerEmail = 'lekk@gmail.com';

describe('Paystack Customer', function () {
    // it('should create customer', function (done) {
    //     Paystack.customer.create("lekk@gmail.com")
    //         .then(function (body) {
    //             console.log(body);
    //             expect(body).to.have.property('message');
    //             expect(body).to.have.property('status');
    //             customerCode = body.data.customer_code;
    //             customerEmail = body.data.email;
    //             done();
    //         })
    //         .catch(function (error) {
    //             return done(error);
    //         })
    //         .done();
    // });

    // it('should list customers', function (done) {
    //     Paystack.customer.list(30, 3) //(perPage, pageNumber)
    //         .then(function (body) {
    //             console.log(body);
    //             expect(body).to.have.property('message');
    //             expect(body).to.have.property('status');
    //             done();
    //         })
    //         .catch(function (error) {
    //             return done(error);
    //         })
    //         .done();
    // });

    it('should fetch a customer', function (done) {
        Paystack.customer.fetch("lekk@gmail.com") //todo change to email var
            .then(function (body) {
                console.log(body);
                expect(body).to.have.property('message');
                expect(body).to.have.property('status');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });
    //
    // it('should update a customer', function (done) {
    //     Paystack.customer.create("lekk@gmail.com")
    //         .then(function (body) {
    //             console.log(body);
    //             expect(body).to.have.property('message');
    //             expect(body).to.have.property('status');
    //             done();
    //         })
    //         .catch(function (error) {
    //             return done(error);
    //         })
    //         .done();
    // });
    //
    // it('should whiteList customer', function (done) {
    //     Paystack.customer.create("lekk@gmail.com")
    //         .then(function (body) {
    //             console.log(body);
    //             expect(body).to.have.property('message');
    //             expect(body).to.have.property('status');
    //             done();
    //         })
    //         .catch(function (error) {
    //             return done(error);
    //         })
    //         .done();
    // });
    //
    // it('should blacklist customer', function (done) {
    //     Paystack.customer.create("lekk@gmail.com")
    //         .then(function (body) {
    //             console.log(body);
    //             expect(body).to.have.property('message');
    //             expect(body).to.have.property('status');
    //             done();
    //         })
    //         .catch(function (error) {
    //             return done(error);
    //         })
    //         .done();
    // });
    //
    // it('should deactivate authorization', function (done) {
    //     Paystack.customer.create("lekk@gmail.com")
    //         .then(function (body) {
    //             console.log(body);
    //             expect(body).to.have.property('message');
    //             expect(body).to.have.property('status');
    //             done();
    //         })
    //         .catch(function (error) {
    //             return done(error);
    //         })
    //         .done();
    // });




});