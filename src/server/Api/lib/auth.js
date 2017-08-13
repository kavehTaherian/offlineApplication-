/**
 * Created by Kaveh T a h e r i a n on 27/07/2017.
 */
var express = require('express'),
    passport = require('passport'),
    router = express.Router();

module.exports = function () {
    router
        .get('/auth/instagram',function (req,res,next) {
            res.redirect('https://www.instagram.com/developer/');
        })
        .get('/auth/instagram/callback',function (req, res, next) {

        })
        .post('/auth/users',function (req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) { return res.status(401).json({ success : false , message : err.message }); }
                if(user == false && info) { return res.status(401).json({ success : false , message : info } ); }
                if (!user) { return res.status(401).json({ success : false , message : 'please login again'}); }
                req.logIn(user, function(err) {
                    if (err) { return res.status(401).json({ success : false , message : err.message }); }
                    return res.status(200).json({ success : true , user : user });
                });
            })(req, res, next);
        });
    return router;
};