var path = require('path');
var request = require('request');
var Promise = require('promise');
var allBanks = require('./resources/all-banks');


var root = 'https://api.paystack.co';

function Paystack(key) {

    if (!(this instanceof Paystack)) {
        return new Paystack(key);
    }

    this.key = key;
    //TRANSFER RECIPIENTS
    Paystack.prototype.all_banks = allBanks;

    var options = {
        url: root,
        json: true,
        headers: {
            'Authorization': ['Bearer ', this.key].join('')
        },
        body: {

        },
        qs: {

        }
    };

    Paystack.prototype.customer = {
        create: function (email, callback) {
            options.url = root+'/customer';
            options.method = 'POST';
            options.body.email = email;
            return requestHandler(options, callback);

        },

        list: function (perPage, page, callback) {
            options.url = root+'/customer';
            options.method = 'GET';
            options.qs.perPage = perPage;
            options.qs.page = page;
            return requestHandler(options, callback);

        },

        fetch: function (email, callback) {
            options.url = root+'/customer/'+email;
            options.method = 'GET';
            return requestHandler(options, callback);

        },

        update: function (callback) { //generic method todo
            options.method = 'POST';
            for(var i =0; i < arguments.length; i++){
                var arg = arguments[i];
                if(typeof arg === 'string'){
                    options.url = root+'/customer/'+ arg.toString();
                }
                else if(!(typeof arg === 'function')){
                    options.body[arg.key] = arg.value;
                }
            }
            return requestHandler(options, callback);

        },

        whiteList: function (customerId, callback) {
            options.url = root + '/customer/set_risk_action';
            options.body.customer = customerId;
            options.body.risk_action = "allow";
            options.method = 'POST';
            return requestHandler(options, callback);

        },

        blackList: function (customerId, callback) {
            options.url = root + '/customer/set_risk_action';
            options.body.customer = customerId;
            options.body.risk_action = "deny";
            options.method = 'POST';
            return requestHandler(options, callback);

        },

        deactiviate: function (authorization_code, callback) {
            options.url = root + '/customer/deactivate_authorization';
            options.body.authorization_code = authorization_code;
            options.method = 'POST';
            return requestHandler(options, callback);

        }
    };

    Paystack.prototype.transaction = {
        initialize: function (reference,amount, email, callback) { //generic method todo
            options.url = root + '/transaction/initialize';
            options.method = 'POST';
            options.body.reference = reference;
            options.body.amount = amount;
            options.body.email = email;
            return requestHandler(options, callback);

        },

        verify: function (callback) {

            return requestHandler(options, callback);

        },

        list: function (callback) {

            return requestHandler(options, callback);

        },

        fetch: function (callback) {

            return requestHandler(options, callback);

        },

        chargeAuth: function (callback) {

            return requestHandler(options, callback);

        },

        viewTimeline: function (callback) {

            return requestHandler(options, callback);

        },

        totals: function (callback) {

            return requestHandler(options, callback);

        },

        exportTransactions: function (callback) {

            return requestHandler(options, callback);

        },

        requestReAuth: function (callback) {

            return requestHandler(options, callback);

        },

        checkAuth: function (callback) {

            return requestHandler(options, callback);

        }

    };

    Paystack.prototype.subaccount = {
        create: function (callback) {

            return requestHandler(options, callback);

        },

        list: function (callback) {

            return requestHandler(options, callback);

        },

        fetch: function (callback) {

            return requestHandler(options, callback);

        },

        update: function (callback) {

            return requestHandler(options, callback);

        }

    };

    Paystack.prototype.plan = {
        create: function (callback) {

            return requestHandler(options, callback);

        },

        list: function (callback) {

            return requestHandler(options, callback);

        },

        fetch: function (callback) {

            return requestHandler(options, callback);

        },

        update: function (callback) {

            return requestHandler(options, callback);

        }
    };

    Paystack.prototype.subscription = {
        create: function (callback) {

            return requestHandler(options, callback);

        },

        list: function (callback) {

            return requestHandler(options, callback);

        },

        disable: function (callback) {

            return requestHandler(options, callback);

        },

        enable: function (callback) {

            return requestHandler(options, callback);

        },

        fetch: function (callback) {

            return requestHandler(options, callback);

        }
    };

    Paystack.prototype.paymentPages = {
        create: function (callback) {

            return requestHandler(options, callback);

        },

        list: function (callback) {

            return requestHandler(options, callback);

        },

        fetch: function (callback) {

            return requestHandler(options, callback);

        },

        update: function (callback) {

            return requestHandler(options, callback);

        },

        checkSlug: function () {

            return requestHandler(options, callback);

        }
    };

    Paystack.prototype.invoice = {
        create: function (callback) {

            return requestHandler(options, callback);

        },

        list: function (callback) {

            return requestHandler(options, callback);

        },

        view: function (callback) {

            return requestHandler(options, callback);

        },

        verify: function (callback) {

            return requestHandler(options, callback);

        },

        sendNotification: function (callback) {

            return requestHandler(options, callback);

        },

        getMetrics: function (callback) {

            return requestHandler(options, callback);

        },

        finalizeDraft: function (callback) {

            return requestHandler(options, callback);

        },

        update: function (callback) {

            return requestHandler(options, callback);

        },

        archive: function (callback) {

            return requestHandler(options, callback);

        }
    };

    Paystack.prototype.settlement = {
        fetch: function (callback) {

            return requestHandler(options, callback);

        }

    };

    Paystack.prototype.transfer = {

        createRecipient: function (name, description, account_number, bank, metadata, callback) {
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

        },


        listRecipients: function (callback) {
            var options = {
                url: [root, "/transferrecipient"].join(''),
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback)
        },

        //TRANSFERS
        initiateSingle: function (source, reason, amount, recipient, callback) {
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
        },

        listTransfers: function (callback) {
            var options = {
                url: [root, "/transfer"].join(''),
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback)
        },

        fetchTransfer: function (code, callback) {
            var options = {
                url: [root, "/transfer/", code.toString()].join(''),
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback)
        },

        finalize: function (transfer_code, otp, callback) {
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
        },

        initiateBulk: function (source, transfers, callback) {
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
        },

        //TRANSFER CONTROLS
        checkBalance: function (callback) {
            var options = {
                url: [root, "/balance"].join(''),
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback);
        },

        resendOtp: function (transfer_code, callback) {
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
        },

        disableOtp: function (callback) {
            var options = {
                url: [root, "/transfer/disable_otp"].join(''),
                json: true,
                method: 'POST',
                headers: {
                    'Authorization': ['Bearer ', this.key].join('')
                }
            };
            return requestHandler(options, callback);
        },

        finalizeOtpDisable: function (otp, callback) {
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
        },

        enableOtp: function (callback) {
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

    Paystack.prototype.bulkCharges = {

        initiate: function (callback) {

            return requestHandler(options, callback);

        },

        list: function (callback) {

            return requestHandler(options, callback);

        },

        fetchBulkChargeBatch: function (callback) {

            return requestHandler(options, callback);

        },
        fetchChargesInBatch: function (callback) {

            return requestHandler(options, callback);

        },

        pause: function (callback) {

            return requestHandler(options, callback);

        },

        resume: function () {

            return requestHandler(options, callback);

        }
    };

    Paystack.prototype.controlPanel = {
        fetchTimeout: function (callback) {

            return requestHandler(options, callback);

        },

        updateTimeout: function () {

            return requestHandler(options, callback);

        }
    };

    Paystack.prototype.charge = {

        tokenize: function (callback) {

            return requestHandler(options, callback);

        },

        charge: function (callback) {

            return requestHandler(options, callback);

        },

        submitPin: function (callback) {

            return requestHandler(options, callback);

        },

        submitOtp: function (callback) {

            return requestHandler(options, callback);

        },

        submitPhone: function () {

            return requestHandler(options, callback);

        },
        submitBirthday: function () {

        },
        checkPending: function () {

        }
    };

    Paystack.prototype.refund = {
        create: function (callback) {

            return requestHandler(options, callback);

        },

        list: function (callback) {

            return requestHandler(options, callback);

        },

        fetch: function (callback) {

            return requestHandler(options, callback);

        }

    };

    Paystack.prototype.verification = {
        resolveBvn: function (callback) {

            return requestHandler(options, callback);

        },

        matchBvn: function (callback) {

            return requestHandler(options, callback);

        },

        resolveAccountNumber: function (callback) {

            return requestHandler(options, callback);

        },

        resolveCardPin: function (callback) {

            return requestHandler(options, callback);

        },

        resolvePhoneNumber: function () {

            return requestHandler(options, callback);

        }
    };

    Paystack.prototype.miscellaneous = {

        listBanks: function (callback) {
            options.method = 'GET';
            options.url += '/bank';

            return requestHandler(options, callback);

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

module.exports = Paystack;