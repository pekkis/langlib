var config = require('./config');
var restify = require('restify');
var merge = require('merge');
var http = require('http');

var uuid = require('node-uuid');


var mysql = require('mysql');
var queues = require('mysql-queues');

var connection = mysql.createConnection(config.mysql);

queues(connection);

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

server.use(restify.bodyParser({ mapParams: false }));

restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());


server.get('/api/translation', function (req, res, next) {

    var q = "SELECT lk.id, lk.langlib_key AS lkey, lt.locale, lt.langlib_translation as translation FROM langlib_keys lk JOIN langlib_translations lt ON (lk.id = lt.id) ORDER BY lk.langlib_key ASC";
    var translations = connection.query(q, function(err, rows) {

        console.log(rows);

        var raw = { };

        rows.forEach(function (row) {
            raw[row.id] = raw[row.id] || { id: row.id, key: row.lkey, translations: { } };
            raw[row.id].translations[row.locale] = row.translation;
        });

        var translations = [];

        for (row in raw) {
            translations.push(raw[row]);
        }

        res.send(translations);
        next();

    });


});

server.post('/api/translation/:id', function (req, res, next) {

    var t = req.body;

    ['fi', 'en', 'sv'].forEach(function (locale) {
        connection.query("REPLACE INTO langlib_translations (id, locale, langlib_translation) VALUES(?, ?, ?)", [t.id, locale, t.translations[locale]]);
    });

    res.send(t);
    next();
});

server.post('/api/translation', function (req, res, next) {

    var t = req.body;

    connection.query('INSERT INTO langlib_keys (langlib_key) VALUES (?)', [t.key], function(err, result) {

        if (err) {
            connection.rollback(function() {
                throw err;
            });
        }

        console.log(result);
        var insertId = result.insertId;

        ['fi', 'en', 'sv'].forEach(function (locale) {
            connection.query("INSERT INTO langlib_translations (id, locale, langlib_translation) VALUES(?, ?, ?)", [insertId, locale, t.translations[locale]]);
        });

        t.id = insertId;
        res.send(t);
        return next();

    });

});


connection.connect(function(err) {

    if (err) {
        console.log(err);
        throw err;
    }

    console.log("Mysql be connected");

    server.listen(config.server.port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });

});


