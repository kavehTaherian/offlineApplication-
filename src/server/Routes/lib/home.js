/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */

var express = require('express'),
    path = require('path'),
    _router = express.Router();
module.exports = function () {
    _router.route('/')
        .get(function (req, res, next) {
            // return res.sendFile(path.resolve(__dirname,'../','../','../','client','index.html'));
            return res.render('home',{ title : 'home' , user : req.user });
        });
    return _router;
};