/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */
var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');
var app = express();
app.use('/bower_components',express.static(path.resolve(__dirname,'../','../','bower_components')));
app.use('/client',express.static(path.resolve(__dirname,'../','client')));
require('./configs/expressConfigs')(app);
require('./configs/mongodb')(mongoose,app);
app.use(require('./utils/middlewares/mongoose'));
require('./configs/passportConfig')(app.get('db'));
require('./Api/index')(app);
require('./Routes')(app);
module.exports = app;