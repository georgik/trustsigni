/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , sync = require('./routes/sync')
    , act = require('./routes/act.js')
    , http = require('http')
    , path = require('path')
    , orm = require('orm');

var app = express();
var dbUser = "postgres";
var dbPassword = "SECRET";
var dbName = "trustsigni";

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(orm.express("postgres://" + dbUser + ":" + dbPassword + "@localhost/" +dbName , {
        define: function (db, models) {
            models.signatory = db.define("signatory", {
                name    : String,                     // you can use native objects to define the property type
                surname : String
            });

            models.act = db.define("act", {
                name: String,
                title: String,
                secret: String,
                created: Date
            });

            models.act.hasMany("signatories", models.signatory);
        }
    }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/sync', sync.sync);
app.get('/act/:actName/count', act.countSignatories);
app.get('/act/:actName/signatories/shortlist', act.getSignatoriesShortList)

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
