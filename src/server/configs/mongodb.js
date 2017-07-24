/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
module.exports = function (mongoose) {
    var _address = {
        host: '',
        port: 12354,

    }
    mongoose.connection.on('connected', function () {
        console.log('connected successfully to mongoDb server');
    });
    mongoose.connection.on('disconnected', function () {
        console.log('disconnected from database server');
    });
    mongoose.connection.on('error', function () {
        console.log('disconnecting from database server because error throwing');
    });
    process.on("SIGINT", function () {
        connection.close();
        console.log('disconnected from mongoDbServer because application termination');
        process.exit(0);
    });
};