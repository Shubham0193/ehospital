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
app.get('/logout', function (req, res) {
  if(req.session.destroy()){
      console.log("session destroy success");
      res.writeHead(302,
          {
              Location: '/login'
          });
      res.end();
  }else{
      console.log("session destroy fail");
  }
    
});


module.exports = app;
