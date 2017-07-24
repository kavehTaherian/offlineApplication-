/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var fs = require('fs'),
    assert = require('assert'),
    _ = require('lodash'),
    path = require('path');
module.exports = function(mongoose){
    var  Schema = mongoose.Schema;
    var schemas = {};
    var _schemas = [];
    var filteredArray = fs.readdirSync(path.resolve(__dirname,'./','lib')).filter(function (file) {
        return file != 'base.js';
    });
    var basePath = path.resolve(__dirname,'./','lib');
    _.forEach(filteredArray,function (file) {
        var obj = require(path.resolve(basePath,file));
        _schemas.push(obj);
    });
    _schemas.forEach(function (schema) {
        var newSchema = new Schema(schema.schema);
        if(schema.virtuals) {
            _.forEach(schema.virtuals, function (item) {
                var virtual = newSchema.virtual(item.name);
                if(item.set){
                    virtual.set(item.set);
                }
                if(item.get){
                    virtual.get(item.get);
                }
            });
        }
        if(schema.methods != null || schema.methods != undefined){
            _.extend(newSchema.methods,schema.methods);
        }
        if(schema.statics != null || schema.statics != undefined){
            schema.statics.forEach(function (static) {
                Object.defineProperty(newSchema.statics,static.name,{
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: static.fn
                });
            });
        }
        Object.defineProperty(schemas,schema.name,{
            enumerable: true,
            configurable: true,
            writable: true,
            value: newSchema});
    });
    return schemas;
};