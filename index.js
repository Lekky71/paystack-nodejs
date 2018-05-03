var path = require('path');
var request = require('request');
var Promise = require('promise');
var allBanks = require('./resources/all-banks');


function Paystack() {

    if (!(this instanceof Paystack)) {
        return new Paystack(key);
    }

    this.key = key;
    //TRANSFER RECIPIENTS
    Paystack.prototype.all_banks = allBanks;

    var root = 'https://api.paystack.co';

    var options = {
        url: root,
        json: true,
        headers: {
            'Authorization': ['Bearer ', this.key].join('')
        }
    };
    Paystack.customer = function () {
        function create(callback) {

        }

        function list(callback) {

        }

        function fetch(callback) {

        }

        function update(callback) {

        }

        function whiteList(callback) {

        }

        function blackList(callback) {

        }

        function deactiviate(callback) {

        }
    };

    Paystack.prototype.transaction = function () {

        function initialize(callback) {

        }

        function verify(callback) {

        }

        function list(callback) {

        }

        function fetch(callback) {

        }

        function chargeAuth(callback) {

        }

        function viewTimeline(callback) {

        }

        function totals(callback) {

        }

        function exportTransactions(callback) {

        }

        function requestReAuth(callback) {

        }

        function checkAuth(callback) {

        }

    };

    Paystack.prototype.subaccount = function () {
        function create(callback) {

        }

        function list(callback) {

        }

        function fetch(callback) {

        }

        function update(callback) {

        }

    };

    Paystack.prototype.plan = function () {
        function create(callback) {

        }

        function list(callback) {

        }

        function fetch(callback) {

        }

        function update(callback) {

        }
    };

    Paystack.prototype.subscription = function () {
        function create(callback) {

        }

        function list(callback) {

        }

        function disable(callback) {

        }

        function enable(callback) {

        }

        function fetch(callback) {

        }
    };

    Paystack.prototype.paymentPages = function () {
        function create(callback) {

        }

        function list(callback) {

        }

        function fetch(callback) {

        }

        function update(callback) {

        }

        function checkSlug() {

        }
    };

    Paystack.prototype.invoice = function () {
        function create(callback) {

        }

        function list(callback) {

        }

        function view(callback) {

        }

        function verify(callback) {

        }

        function sendNotification(callback) {

        }

        function getMetrics(callback) {

        }

        function finalizeDraft(callback) {

        }

        function update(callback) {

        }

        function archive(callback) {

        }
    };

    Paystack.prototype.settlement = function () {
        function fetch(callback) {

        }

    };

    Paystack.prototype.transfer = function () {

        function createRecipient(name, description, account_number, bank, metadata, callback) {
            var options = {
                url: [root, "/transferrecipient"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                },
                body: {
                    type: "nuban",
                    name: name,
                    description: description,
                    account_number: account_number,
                    bank_code: bank.code,
                    currency: "NGN",
                    metadata: metadata
                }
            };
            return requestHandler(options, callback);

        }


        function listRecipients(callback) {
            var options = {
                url: [root, "/transferrecipient"].join(''),
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback)
        }

        //TRANSFERS
        function initiateSingle(source, reason, amount, recipient, callback) {
            var options = {
                url: [root, "/transfer"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                },
                body: {
                    source: source,
                    reason: reason,
                    amount: amount,
                    recipient: recipient
                }
            };
            return requestHandler(options, callback);
        }

        function listTransfers(callback) {
            var options = {
                url: [root, "/transfer"].join(''),
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback)
        }

        function fetchTransfer(code, callback) {
            var options = {
                url: [root, "/transfer/", code.toString()].join(''),
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback)
        }

        function finalize(transfer_code, otp, callback) {
            var options = {
                url: [root, "/transfer/finalize_transfer"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                },
                body: {
                    transfer_code: transfer_code,
                    otp: otp
                }
            };
            return requestHandler(options, callback);
        }

        function initiateBulk(source, transfers, callback) {
            var options = {
                url: [root, "/transfer"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join(''),
                    'Content-Type': 'application/json'
                },
                body: {
                    currency: "NGN",
                    source: source,
                    transfers: JSON.stringify(transfers)
                }
            };
            return requestHandler(options, callback);
        }

        //TRANSFER CONTROLS
        function checkBalance(callback) {
            var options = {
                url: [root, "/balance"].join(''),
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback);
        }

        function resendOtp(transfer_code, callback) {
            var options = {
                url: [root, "/transfer/resend_otp"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                },
                body: {
                    transfer_code: transfer_code
                }
            };
            return requestHandler(options, callback);
        }

        function disableOtp(callback) {
            var options = {
                url: [root, "/transfer/disable_otp"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback);
        }

        function finalizeOtpDisable(otp, callback) {
            var options = {
                url: [root, "/transfer/disable_otp_finalize"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                },
                body: {
                    otp: otp
                }
            };
            return requestHandler(options, callback);
        }

        function enableOtp(callback) {
            var options = {
                url: [root, "/transfer"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                },
                body: {}
            };
            return requestHandler(options, callback);
        }

    };

    Paystack.prototype.bulkCharges = function () {

        function initiate(callback) {

        }

        function list(callback) {

        }

        function fetchBulkChargeBatch(callback) {

        }
        function fetchChargesInBatch(callback) {

        }

        function pause(callback) {

        }

        function resume() {

        }
    };

    Paystack.prototype.controlPanel = function () {
        function fetchTimeout(callback) {

        }

        function updateTimeout() {

        }
    };

    Paystack.prototype.charge = function () {

        function tokenize(callback) {

        }

        function charge(callback) {

        }

        function submitPin(callback) {

        }

        function submitOtp(callback) {

        }

        function submitPhone() {

        }
        function submitBirthday() {
            
        }
        function checkPending() {
            
        }
    };

    Paystack.prototype.refunds = function () {
        function create(callback) {

        }

        function list(callback) {

        }

        function fetch(callback) {

        }

    };

    Paystack.prototype.verification = function () {
        function resolveBvn(callback) {

        }

        function matchBvn(callback) {

        }

        function resolveAccountNumber(callback) {

        }

        function resolveCardPin(callback) {

        }

        function resolvePhoneNumber() {

        }
    };

    Paystack.prototype.miscellaneous = function () {
        function listbanks() {

        }
    };

    var requestHandler = function (options, callback) {
        return new Promise(function (fulfill, reject) {
            request(options, function (error, response, body) {
                if (error) reject(error);
                else if (!body.status) {
                    error = body;
                    body = null;
                    reject(error);
                }
                else {
                    fulfill(body);
                }
            });
        }).then(function (value) {
            if (callback) {
                return callback(null, value);
            }
            return value;
        }).catch(function (reason) {
            if (callback) {
                return callback(reason, null);
            }
            return reason;
        });
    }

}