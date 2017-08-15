/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var _ = require('lodash'),
    assert = require('assert'),
    validator= require('validator');
var App = function (args) {
    assert.ok(args !== null || args!= undefined);
    var self = this;
    self.args = args;
    var emailIsValid= function () {
        if(!_.isNull(args.email) &&
            !_.isUndefined(args.email) &&
            args.email.indexOf('@') > -1 &&
            validator.isEmail(args.email.toString())) { return true; }
        else { return false; }
    };
    var passwordIsValid= function () {
        if(!_.isNull(args.password) &&
            !_.isUndefined(args.password) &&
            args.password.length > 6){
            return true;
        }else{
            return false;
        }
    }
    var firstNameIsValid= function () {
        if(!_.isNull(args.firstName) &&
            !_.isUndefined(args.firstName) &&
            args.firstName.length > 2 &&
            validator.isAlpha(args.firstName)){
            return true;
        }else{
            return false;
        }
    }
    var lastNameIsValid= function () {
        if(!_.isNull(args.lastName) &&
            !_.isUndefined(args.lastName) &&
            args.lastName.length > 2 &&
            validator.isAlpha(args.lastName) &&
            !validator.isNumeric(args.lastName)){
            return true;
        }else{
            return false;
        }
    }
    var passwordConfirmMatched= function () {
        return args.password == args.confirm;
    }
    var ageValidation= function () {
        return validator.isNumeric(args.age.toString()) &&
            !_.isNull(args.age) &&
            !_.isUndefined(args.age);
    }
    self.isValid= function () {
        return emailIsValid() &&
            firstNameIsValid() &&
            lastNameIsValid() &&
            passwordIsValid() &&
            passwordConfirmMatched() &&
            ageValidation();
    }
};
module.exports = App;