/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
module.exports = function (mongoose,app) {
    mongoose.connection.on('connected', function () {
        console.log('connected successfully to mongoDb server');
    });
    mongoose.connection.on('disconnected', function () {
        console.log('disconnected from database server');
    });
    mongoose.connection.on('error', function (error) {
        console.log(error);
        console.log('disconnecting from database server because error throwing');
    });
    process.on("SIGINT", function () {
        mongoose.connection.close(function () {
            console.log('disconnected from mongoDbServer because application termination');
            process.exit(0);
        });
    });
    var connectionString = 'mongodb://k3:kaveh@ds137191.mlab.com:37191/offlineapp';
    var Db = require('../utils/db');
    var options = {authMechanism: 'ScramSHA1'};
    var db = new Db({uri : connectionString , options : {} });
    app.set('db',db);
};