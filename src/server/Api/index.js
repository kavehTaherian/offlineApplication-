/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
module.exports = function (app) {
    app.use('/api',require('./lib/systemInfo')());
    app.use('/api',require('./lib/auth')());
};