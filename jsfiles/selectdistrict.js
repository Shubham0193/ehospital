var express = require('express');
var connection = require('./db.js');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var dateFormat = require('dateformat');
var parallel = require('run-parallel');
var async = require('async');
var moment = require('moment');
var S = require('string');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bcrypt = require('bcrypt');
moment().format();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public"));
var path = require('path');
var methods = require('./index.js');

var session = require('express-session');
//app.use(session({ secret: 'ssshhhhh' }));
app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
}));
// var sess;

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'public/views'));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './public/views');

var Id;

app.get('/getdist', function (req, res) {
    var sqlqry = 'SELECT districts.id,districts.name FROM districts RIGHT JOIN states ON districts.state_id = states.id where state_id = "' + req.query.state + '"';
    connection.query(sqlqry,
       function (err, result) {
           if (err) throw err;
           res.send(result);
           //callback(result);
       });
});
module.exports = app;