/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */

module.exports = function (app) {
    app.use('/',require('./lib/home')());
    app.use('*',require('./lib/404')());
    app.use('*',require('./lib/500')());
};