/**
 * Created by Kaveh T a h e r i a n on 31/07/2017.
 */
var express = require('express'),
    passport = require('passport'),
    router = express.Router();

module.exports = function () {
    router
        .route('/account/signin')
        .get(function (req,res,next) {
            return res.render('signin',{ title : 'login' });
        })
        // .post([require('../../utils/middlewares/passportAuthentication')()]);
        // .post(passport.authenticate('local',{ successRedirect : '/' , failureRedirect: '/'}));
        .post(function (req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if(user == false && info) { return res.json({ unAuthorize : info } ); }
                if (!user) { return res.redirect('/account/signin'); }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    res.redirect('/');
                });
            })(req, res, next);

        });
    return router;
};