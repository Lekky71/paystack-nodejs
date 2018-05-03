var request = require('request');
var Promise = require('promise');


module.exports = function (options, callback) {
    return new Promise( function(fulfill, reject) {
        request(options, function(error, response, body) {
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
    }).then( function(value) {
        if (callback) {
            return callback(null, value);
        }
        return value;
    }).catch(function(reason){
        if (callback) {
            return callback(reason, null);
        }
        return reason;
    });
}
