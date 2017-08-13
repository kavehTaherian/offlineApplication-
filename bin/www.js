/**
 * Created by Kaveh T a h e r i a n on 16/07/2017.
 */

var http = require('http'),
    os = require('os'),
    Q = require('q'),
    numCpus= os.cpus().length,
    cluster = require('cluster'),
    server;
var app = require('../src/server/server');
var db = app.get('db');
Q.all([db.init()]).then(function (result) {
    app.set('db',result);
    process.nextTick(function () {
        if(cluster.isMaster){
            console.log('Fork %s worker(s) from master',numCpus);
            for(var i=0; i< numCpus; i++){
                cluster.fork();
            }
            cluster.on('online',function(worker){
                console.log('worker is running on %s process id',worker.process.pid);
            });
            cluster.on('exit',function(worker){
                console.log('worker with process id %s is closed ',worker.process.pid);
            });
        }else if(cluster.isWorker){
            server = http.createServer(app);
            server.listen(app.get('port'),app.get('server_ip_address'),function () {
                console.log('server running at ' + app.get('server_ip_address') + ':' + app.get('port'));
            });
        }
    });
});