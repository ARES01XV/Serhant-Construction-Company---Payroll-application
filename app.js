const port = process.env.PORT || 8080;

// base variables
var path = require('path');
var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var conn = require('./lib/db');

//for CSS to take effect
app.use('/public', express.static('public'));

// ************ ROUTING **********************
var indexRoute = require('./routes/index'); 
var accountsRoute = require('./routes/accounts');
var acc_loginRoute = require('./routes/acc_login');
var employeesRoute = require('./routes/employees');
var emp_loginRoute = require('./routes/emp_login')
var supervisorsRoute = require('./routes/supervisors');
var sup_loginRoute = require('./routes/sup_login')

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setup sessions
app.use(cookieParser());
app.use(session({
    secret: 'oppai', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));
app.use(flash());  

//routing middlewares
app.use('/', indexRoute); 
app.use('/accounts', accountsRoute);
app.use('/acc_login', acc_loginRoute);
app.use('/employees', employeesRoute);
app.use('/emp_login', emp_loginRoute);
app.use('/supervisors', supervisorsRoute);
app.use('/sup_login', sup_loginRoute);


app.listen(port, () => console.log(`Listening on port ${port}..`));