/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var _ = require('lodash'),
    validator = require('validator');
var authenticationApp = function (args) {
    args || (args = {});
    var self = this;
    _.extend(self,args);
    var checkEmail = function () {
        if(!_.isNull(self.email) &&
            !_.isUndefined(self.email) &&
            !validator.isEmpty(self.email) &&
            self.email.length > 1 &&
            validator.isEmail(self.email)) {
            return true;
        }
        else{
            return false;
        }

    };
    var checkPassword = function () {
        return self.password.length > 6 && !validator.isEmpty(self.password) && !_.isNull(self.password) && !_.isUndefined(self.password);
    };
    self.isValid = function () {
        return checkEmail() && checkPassword();
    }
};
module.exports =authenticationApp;