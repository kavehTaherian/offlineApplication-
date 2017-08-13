/**
 * Created by Kaveh T a h e r i a n on 14/08/2017.
 */
var passport = require('passport'),
    path = require('path'),
    LocalStrategy = require('passport-local').Strategy,
    Auth = require('../processes/authentication.js'),
    assert = require('assert');
module.exports = function (db) {
    assert.ok(db,'dataBase object required');
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    },function (email,password,done) {
        var _auth = new Auth(db);
        _auth.start({ email : email , password : password },function (err,result) {
            if(err){
                done(null,false,err);
            }else{
                done(null,result.user);
            }
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null,user.id);
    });
    passport.deserializeUser(function (id, done) {
        db.User.findById(id,function (err, user) {
            done(err,user);
        });
    });
};