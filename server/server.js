var config = require('./config');
var restify = require('restify');
var merge = require('merge');
var http = require('http');

var uuid = require('node-uuid');

var server = restify.createServer();

var mergedOptions = merge(
    config.proxy,
    {
        'headers': {
            'x-lus-msisdn': config.msisdn
        }
    }
);

server.pre(restify.pre.userAgentConnection());
server.use(restify.queryParser());

restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());

server.get('/translation', function (req, res, next) {

    var translations = [
        {
            'key': 'lusso.suck_a_duck',
            'translations': {
                'fi': 'Lipaiseppa ankkaa',
                'se': 'Sucken sie eine duk',
                'en': 'Please suck a duck'
            }
        }
    ];

    res.send(translations);
    next();
});

server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});
