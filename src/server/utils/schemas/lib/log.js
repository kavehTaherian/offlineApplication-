/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var base= require('./base')();
var _ = require('lodash');
var log = {};
log.name = 'log';
log.schema = {
    subject : { type : String },
    description : { type : String },
    created_at : { type : Date , default: Date.now },
    modified_at : { type : Date ,default : Date.now },
    user_id : { type : 'ObjectId' , ref : 'User'}
};
_.extend(log.schema,base.schema);
log.virtuals=[];
_.concat(log.virtuals,base.virtuals);
module.exports = log;