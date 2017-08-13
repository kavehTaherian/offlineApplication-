/**
 * Created by Kaveh T a h e r i a n on 25/07/2017.
 */
var express = require('express'),
    router = express.Router(),
    os = require('os');

module.exports = function () {
    router.route('/system')
        .get(function (req, res, next) {
            try {
                var result = {
                    "platform": os.platform(),
                    "type": os.type(),
                    "arch": os.arch(),
                    "cpu Numbers": os.cpus().length,
                    "host Name": os.hostname(),
                    "total Memory": parseInt(os.totalmem(),10) /1073741824,
                    "free Memory": parseInt(os.freemem(),10) / 1073741824 ,
                    "networkInterfaces": os.networkInterfaces()
                };
                console.log(os.networkInterfaces());
                return res.status(200).json(result);
            }
            catch(e){
                return next(new Error('something bad happened \r\n' + e.message ));
            }
        });
    return router;
};