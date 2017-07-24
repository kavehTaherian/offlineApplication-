/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */
module.exports = function() {
    return function (req, res, next) {
        var err = new Error();
        err.statusCode = 404;
        err.message = 'Not Found';
        return next(err);
    };
};