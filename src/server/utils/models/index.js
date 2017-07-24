/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var _= require('lodash');
module.exports= function (mongoose) {
    if(!_.isEmpty(mongoose.modelSchemas) && !_.isEmpty(mongoose.models)){
        if(_.find(mongoose.models,
                function (model) { return model.modelName == 'User'}) &&
            _.find(mongoose.models,function (model) { return model.modelName == 'Log'})
        ){
            return {
                user: mongoose.model('User'),
                log: mongoose.model('Log')
            }
        }
    }else{
        var schemas = require('../schemas')(mongoose);
        return {
            user: require('./lib/user')(mongoose,schemas.user),
            log: require('./lib/log')(mongoose,schemas.log)
        }
    }

};