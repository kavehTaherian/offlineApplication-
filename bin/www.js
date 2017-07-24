/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */

var http = require('http');
var app = require('../src/server/server');
var server = http.createServer(app);
server.listen(app.get('port'),function () {
    console.log('server running at ' + app.get('server_ip_address') + ':' + app.get('port'));
});

module.exports = server;