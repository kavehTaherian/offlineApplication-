/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */
var bodyParser = require('body-parser'),
    path= require('path'),
    methodOverride = require('method-override'),
    responseTime = require('response-time'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    logger = require('morgan');
module.exports = function (app) {
    app.use(logger('dev'));
    app.set('view engine','jade');
    app.set('views',path.resolve(__dirname,'../','views'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(cookieParser('double secret Protection'));
    app.use(session({
        secret : 'AAAA-FFFB-CMNVD-JKQODA' ,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(methodOverride('_method'));
    app.use(responseTime());
    app.set('x-powered-by',false);
    app.set('ClientID','a64093991a9543e2a398c3b7cfd3ad58');
    app.set('ClientSecret','4c2a883883de4ecda6af40be9be115c1');
    if(process.env.NODE_ENV &&
        process.env.NODE_ENV == 'development'){app.set('port',process.env.PORT || 3300);}
    else {
        var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

        app.set('port',server_port);
        app.set('server_ip_address',server_ip_address);
    }
};