/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var _ = require('lodash'),
    Q = require('q'),
    mongoose = require('mongoose'),
    models = require('./models');
var Db = function (args) {
    var self = this;

    self.init= function () {
        var defer = Q.defer();
        mongoose.connect(args.uri,args.options,function (error) {
            if(error) { defer.reject(error); }
            else{
                var _models = models(mongoose);
                self.User = _models.user;
                self.Log = _models.log;
                defer.resolve(self);
            }
        });
        return defer.promise;
    }
};
module.exports = Db;