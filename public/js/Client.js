var http = require('http');

var options = {
    port: '8080',
    hostname: 'localhost',
    path: '/'
};

var callback = function(res){
    res.setEncoding('utf8');
    res.on('data', function(body){
        console.log('1');
        console.log(body);
    });
};

http.get(options, callback);