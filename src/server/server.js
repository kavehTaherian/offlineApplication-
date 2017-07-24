/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    responseTime = require('response-time'),
    logger = require('morgan');

var app = express();
app.use(logger('dev'));
app.use('/bower_components',express.static(path.resolve(__dirname,'../','../','bower_components')));
app.use('/client',express.static(path.resolve(__dirname,'../','client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(responseTime());
require('./configs/expressConfigs')(app);
require('./Routes')(app);
module.exports = app;