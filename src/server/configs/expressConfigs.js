/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */
module.exports = function (app) {
    if(process.env.NODE_ENV &&
        process.env.NODE_ENV == 'development'){app.set('port',process.env.PORT || 3300);}
    else {
        var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

        app.set('port',server_port);
        app.set('server_ip_address',server_ip_address);
    }
};