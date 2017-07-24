/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var _ = require('lodash'),
    base = require('./base')(),
    crypto = require('crypto');
var user = {};
user.name = 'user';
user.schema = {
    email : { type: String , unique : true},
    salt : { type : String },
    hashed_password : { type : String },
    profile : {
        first_name: {type: String},
        last_name: {type: String},
        gender: { type: String },
        image: { type: Buffer , required: false },
        user_name: {type: String},
        age : { type : Number},
        birthDate : { type : Date, required : false },
        birthPlace : { type : String },
        twitter :{ type : String },
        facebook: { type : String },
        instagram: { type : String }
    },
    is_active : { type : Boolean, default : false },
    status : { type : String , default : 'pending'},
    current_login_at : { type : Date , default : Date.now },
    last_login_at : { type : Date , default : Date.now },
    login_counts : { type : Number , default : 1},
    logs : [{ type : 'ObjectId' , ref : 'Log'}]
};
_.extend(user.schema,base.schema);
user.virtuals =[
    {
        'name': 'password',
        'get': function () {
            return this._password;
        },
        'set': function (pass) {
            this._password = pass;
            this.salt = this.makeSalt();
            this.hashed_password = this.hashPassword(this._password);
        }
    }];
_.concat(user.virtuals,base.virtuals);
user.methods = {
    'makeSalt': function () {
        return crypto.randomBytes(256).toString('base64');
    },
    'hashPassword': function (pass) {
        pass.toString('base64');
        return crypto.createHmac('sha256', this.salt).update(pass).digest('hex');
    },
    'checkPassword' : function (plainPassword) {
        return this.hashed_password == this.hashPassword(plainPassword);
    }
};
module.exports = user;