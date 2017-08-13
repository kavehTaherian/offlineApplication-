/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var _= require('lodash'),
    assert = require('assert'),
    async = require('async'),
    AuthApp = require('../utils/authenticationApplication.js');
var Authentication = function (db) {
    assert.ok(db != undefined,'authentication process need database utilities');
    var self= this;
    self.authPath = null;
    // check inputs
    self.checkInputs = function (callback) {
        if(self.authApp.isValid()){
            callback(null,self.authApp);
        }else {
            var err = 'username or password invalid';
            callback(err,null);
        }
    };
    // validate username
    self.checkUserName = function (args,callback) {
        db.User.findOne({ email : args.email },function (err, doc) {
            if(err) {
                callback(err,null);
            }
            if(_.isEmpty(doc)){
                callback('user not found',null);
            }else{
                callback(null,args,doc);
            }
        });
    };
    // validate password
    self.validatePassword= function (args, user,callback) {
        if(user.checkPassword(args.password)){
            callback(null,user);
        }else{
            callback('invalid password',null);
        }
    };
    // update authenticated user
    self.updateUser = function (user,callback) {
        var _update = {
            status : 'online',
            login_counts : user.login_counts + 1,
            current_login_at : Date.now(),
            last_login_at : Date.now(),
            modifiedAt : Date.now
        };
        db.User.findOneAndUpdate({ email : user.email },_update,{ new : true },function (err, doc) {
            if(err) { callback(err,null); }
            if(_.isEmpty(doc)){ callback('something bad happened',null); }
            else{
                callback(null,doc);
            }
        });
    };
    // add entry to log
    self.addNewLog = function (user,callback) {
        var _newLog = {
            subject : 'Authentication',
            description: 'authentication was successful',
            user_id : user.id
        };
        db.Log.create(_newLog,function (err, doc) {
            if(err) { callback(err,null); }
            if(_.isEmpty(doc)){
                callback('something bad happened',null);
            }else {
                var result = { user : user,log : doc};
                callback(null,result);
            }
        });
    };

    // start Authentication by accept inputs
    self.start = function (inputs,callback) {
        self.authApp = new AuthApp(inputs);
        async.waterfall([
            self.checkInputs,
            self.checkUserName,
            self.validatePassword,
            self.updateUser,
            self.addNewLog
        ],function (err, result) {
            // return proper message to client
            if(err) {
                return callback(err,null);
            }else {
                return callback(null,result);
            }
        });
    };
};
module.exports= Authentication;