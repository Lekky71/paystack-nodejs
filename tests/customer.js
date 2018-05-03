var key = process.env.PAYSTACK_TEST_KEY;
var Paystack = require('../index')(key.toString());
var expect = require('chai').expect;
console.log(key);