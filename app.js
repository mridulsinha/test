var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var index = require('./routes/index');
var users = require('./routes/users');
var jwt = require('jsonwebtoken');
//var apiRoutes = express.Router();

var expressValidator = require('express-validator');
var config = require('./config.json');

var app = express();
app.all('/*', function(req, res, next) {
    console.log('Node Entry Point----------- :  ');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, x-access-token");
    //res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use('/', index);
app.use('/configuration', require('./controller/dfpDataTest.controller'));
app.use('/mergeCall', require('./controller/dfpDataTest.controller'));
app.use('/users', require('./controller/user.controller'));
app.use(cors({ origin: '*', optionsSuccessStatus: 200 })); 
app.use(function(req, res, next) {

    console.log('Node Entry Point------2----- :  ');
    var token = req.headers['x-access-token'];

   // console.log('-----token------: ' + token);
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        //res.status(200).send(decoded);
        else {
            req.decoded = decoded;
            next();
        }
    });

});
app.use('/ad', require('./controller/ad.controller'));
app.use('/ess', require('./controller/ess.controller'));
app.use('/hyperv', require('./controller/hyperv.controller'));
app.use('/apache', require('./controller/apache.controller'));
app.use('/kerberos', require('./controller/kerberos.controller'));
app.use('/dhcp', require('./controller/dhcp.controller'));
app.use('/dns', require('./controller/dns.controller'));
app.use('/ldap', require('./controller/ldap.controller'));
app.use('/trendos', require('./controller/trendos.controller'));
app.use('/ntp', require('./controller/ntp.controller'));





console.log('-------Node Entry Point----------- :  ');

app.use('/openstack', require('./controller/openstack.controller'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {

    console.log('Node Entry Point---3-------- :  ');
    var err = new Error('Not Found');
    //res.setHeader('Access-Control-Allow-Origin', '*');


    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    err.status = 404;
    next(err);
});
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});*/

// error handler
app.use(function(err, req, res, next) {

    console.log('Node Entry Point-------4---- :  ');
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
process.title = 'DFPBackend';
var server = app.listen(port, function() {
    console.log('Common GUI Backend Server Listening At :  ' + port);
});

module.exports = app;