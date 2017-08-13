/**
 * Created by Kaveh T a h e r i a n on 12/08/2017.
 */
var express = require('express'),
    os = require('os'),
    _router = express.Router();

module.exports = function () {
    _router.route('/system/info')
        .get(function (req, res, next) {
            try {
                var result = {
                    "platform": os.platform(),
                    "type": os.type(),
                    "arch": os.arch(),
                    "cpu Numbers": os.cpus().length,
                    "host Name": os.hostname(),
                    "total Memory": parseInt(os.totalmem(),10) /1073741824,
                    "free Memory": parseInt(os.freemem(),10) / 1073741824
                };
                return res.status(200).render('serverinformation',{ title : 'server Information' , info : result});
            }
            catch(e){
                return next(new Error('something bad happened \r\n' + e.message ));
            }
        });
    return _router;
};