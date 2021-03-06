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
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './public/views');
//app.use(session({ secret: 'ssshhhhh' }));
app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
}));

var sess;

//calling to listing functionality..
app.get('/manage-hospital', function (req, res) {
sess = req.session;
 if (sess.email && sess.roll == 1){
     var fields = ['Id', 'Name'];                                      //LISTING
     var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
     var tableName = "branch";
     methods.manageHospital(tableName, fields, condition, req, res, function (data1) {
         res.render('manage-hospital', {
             users: data1,
         });
     });
 }else{
     console.log("You dont have access for these page");
     res.render('login');
 }
    
});
//end of search functionality


module.exports = app;