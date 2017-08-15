/**
 * Created by Kaveh T a h e r i a n on 31/07/2017.
 */
var express = require('express'),
    passport = require('passport'),
    path = require('path'),
    router = express.Router(),
    Reg = require('../../processes/registration.js');
module.exports = function () {
    router
        .route('/account/signup')
        .get(function (req,res,next) {
            return res.render('signup',{ title : 'registration'});
        })
        .post(function (req, res, next) {
            var _reg = new Reg(req.db);
            _reg.startRegistration(req.body,function (err, result) {
                if(err){
                    return next(err);
                }else{
                    process.nextTick(function () {
                        req.login(result.user,function (err) {
                            if(err){
                                return next(err);
                            }else{
                                // req.session.passport.user = result.user;
                                res.end();
                                return res.redirect('http://nodeapplication-meanappcms.rhcloud.com/');
                            }
                        });
                    });
                }
            });
        });
    return router;
};