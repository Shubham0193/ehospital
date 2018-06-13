var express = require('express');
var connection = require('./db.js');
var bcrypt = require('bcrypt');
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
moment().format();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var session = require('express-session');
//app.use(session({ secret: 'ssshhhhh' }));
app.use(session({
  secret: 'ssshhhhh',
  resave: true,
  saveUninitialized: true
}));
// var sess;
var path = require('path');
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/dashboard', function (req, res) { 

  if (req.session.email) {
    var id = req.query.Id;
    sess = req.session;
    sess.branchid = id;
    res.render('dashboard');
  }else{
    res.render('login');
  }   
});
module.exports = app;