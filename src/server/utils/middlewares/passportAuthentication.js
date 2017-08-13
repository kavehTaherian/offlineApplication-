/**
 * Created by Kaveh T a h e r i a n on 06/08/2017.
 */
var passport = require('passport');
module.exports = function (req,res,next) {
    var redirects = {
        successRedirect : '/',
        failureRedirect : '/account/signin',
        failureFlash : true
    };
    return passport.authenticate('local',redirects);
};