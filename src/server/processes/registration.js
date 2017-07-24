/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var assert = require('assert'),
    App = require('../utils/RegistrationApplication'),
    async= require('async');

var Registration = function (db) {
    assert.ok(db,'database provider needed');
    var self = this;
    self.app = null;
    /* ***************************************************
     * check inputs for registration                     *
     *  check password matched with it's confirmation    *
     ****************************************************/
    var checkInputs= function (callback) {
        console.log(1);
        if(!self.app.isValid()){
            callback('invalid inputs',null);
        }else{
            callback(null,self.app.args);
        }
    };
    // check email does not already exists
    var checkEmailAlreadyExists= function (app, callback) {
        console.log(2);
        db.User.findOne({ email : app.email },function (err, doc) {
            if(err){
                callback(err,null);
            }
            if(doc){
                callback('user already Exists',null);
            }
            else{
                callback(null,app)
            }
        });
    };
    // save new user to database
    var insertUser = function (args,callback) {
        console.log(3);
        db.User.create(args,function (err, doc) {
            if(err) { callback(err,null); }
            else{ callback(null,doc); }
        });
    };
    // create new log for saved user
    var createLogEntry= function (user, callback) {
        var _log= {
            subject : 'registration',
            description: 'user registered successfully',
            'user_id': require('mongoose').Types.ObjectId(user.id)
        };
        db.Log.create(_log,function (err, doc) {
            if(err){ callback(err,null); }
            else {
                callback(null,doc); }
        });
        // _log.save(function (err) {
        //     if(!err){
        //         callback(null,user,_log);
        //     }else{
        //         callback(err,null);
        //     }
        // });
    };
    // send proper message to client
    self.startRegistration = function (args,cb) {
        var _user = {
            firstName : args.profile.first_name,
            lastName : args.profile.last_name,
            age : args.profile.age,
            email : args.email,
            password : args.password,
            confirm : args.confirm
        };
        self.app= new App(_user);
        async.waterfall([
            checkInputs,
            checkEmailAlreadyExists,
            insertUser,
            createLogEntry
        ],function (err, result) {
            if(err){
                return cb(err,null);
            }
            else{
                return cb(null,true);
            }
        });
    };
};

module.exports = Registration;