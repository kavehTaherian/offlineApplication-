/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */
module.exports = function(){
    return function (err,req, res, next) {
        if (err.statusCode != 404) {
            err.statusCode = 500;
            err.message = 'something bad Happened';
        }
        return res.json({"Error": err});
    };
};