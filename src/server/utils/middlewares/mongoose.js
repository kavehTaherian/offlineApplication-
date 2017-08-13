/**
 * Created by Kaveh T a h e r i a n on 07/08/2017.
 */
module.exports = function (req, res, next) {
    // var connectionString = 'mongodb://k3:kaveh@ds119588.mlab.com:19588/k2';
    // var connectionString = 'mongodb://k3:kaveh@ds137191.mlab.com:37191/offlineapp';
    // var Db = require('../db');
    // var options = {authMechanism: 'ScramSHA1'};
    // var db = new Db({uri : connectionString , options : {} });
    // Q.all([db.init()]).then(function (result) {
    //     req.db = result;
    //     req.app.set('db',result);
    //     return next();
    // });
    req.db = req.app.get('db')[0];
    return next();
};