var connect = require('connect');
var url = require('url');
var proxy = require('proxy-middleware');
 
var app = connect();
app.use('/api', proxy(url.parse('https://example.com/endpoint')));
app.use('/api-string-only', proxy('https://example.com/endpoint'));