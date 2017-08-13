/**
 * Created by Kaveh T a h e r i a n on 07/08/2017.
 */
var express = require('express'),
    _router = express.Router();
module.exports = function () {
    _router.route('/account/users/profile')
        .all(require('../../utils/middlewares/globalAuth')())
        .get(function (req, res, next) {
            return res.json({ message : 'hello' });
        });
        // .get(function (req, res, next) {
        //    return res.status(200).json({ 'Hello' : 'world'});
        // });
    return _router;
};