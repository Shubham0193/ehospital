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
app.get('/login', function (req, res) {   
    res.render('login');
});
//end of search functionality

app.post('/login', urlencodedParser, function (req, res) {
    sess = req.session;
    var email = req.body.txtemail;
    var password = req.body.txtpass; 
    var qry = 'SELECT * FROM admin where Email = \'' + email + '\'  AND  Password = \'' + password + '\'';
    connection.query(qry,
        function (err, result) {
            if (err) throw err;
            if (result.length > 0){
                sess.email = result[0].email; 
                sess.bid = result[0].bid;
                sess.roll = result[0].roll;  
                    if(sess.email && sess.roll == 1)
                    {
                        var fields = ['Id', 'Name'];                                      //LISTING
                        var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                        var tableName = "branch";
                        methods.manageHospital(tableName, fields, condition, req, res, function (data1) {
                            res.render('manage-hospital', {
                                users: data1,                
                            });
                        });
                    } else if(sess.email && sess.roll == 2){
                           res.render('dashboard');
                }               
                }else{
                   console.log("Invalid Credentials");
                  res.render('login');
            }               
        }
    );
});
module.exports = app;