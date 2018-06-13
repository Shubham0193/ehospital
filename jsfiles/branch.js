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
moment().format();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var bcrypt = require('bcrypt');
var methods = require('./index.js');
var path = require('path');

var session = require('express-session');
//app.use(session({ secret: 'ssshhhhh' }));
app.use(session({
  secret: 'ssshhhhh',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/add-branch', function (req, res) {
  // console.log(req.session.email); 
  var Id = req.query.Id;
  if (req.session.email) {
    if(Id>0)
    {
      var fields = ["`Name`","`ModifiedDate`"];
      var condition=[{'value':Id,'condition':'=','name':'Id'}];
      var tableName = "branch";
      methods.getsinglerecord(tableName,fields,condition,req,res,function(data1){
        res.render('add-branch',{
          users:data1,
          Id:Id
        });
      });
    }
    else
    {
      res.render('add-branch', {
      Id:Id
      });
    }
  }else{
    res.render('login');
  }
});  

app.get('/search-branch', function (req, res) {  
  if (req.session.email) {
    var searchName=req.query.searchName;
    var tableName="branch";                                    //SEARCHING
    var fields=['Id','Name'];
    var condition=[{'value': "'"+searchName+"'" ,'condition':' LIKE ','name':'Name'}]; 
    methods.listing(tableName,fields,condition,req,res,searchName,function(data1){
    });
  }else{
    res.render('login');
  }
});   

app.get('/branch', function (req, res) {  
  if (req.session.email) {
    var fields=['Id','Name'];                                      //LISTING
    var condition=[{'value':'0','condition':'=','name':'IsDelete'}];
    var tableName="branch";
    methods.listing(tableName,fields,condition,req,res,function(data1){
    });
  }else{
    res.render('login');
  }
});   

app.get('/delete-branch', function (req, res) { 
  if (req.session.email) { 
    var Id=req.query.Id;
    var tableName="branch";                                //DELETE
    var fields = ["`IsDelete`"];
    var values = ["'"+ 1 +"'"];
    var condition=[{'value':Id,'condition':'=','name':'Id'}];
    methods.deletion(tableName,fields,values,condition,req,res,function(data1){     
      res.writeHead(302,
      { 
        Location: '/branch'
      });
      res.end();
    });
  }else{
    res.render('login');
  }
});   

app.post('/add-branch', urlencodedParser, function (req, res) {
  if (req.session.email) {
    var datetime = new Date();
    var currdate = dateFormat(datetime, "yyyy-mm-dd hh:MM:ss");          //INSERT AND EDIT 
    var Id = req.query.Id;
    var tableName = "branch";
      if(Id>0)
      {  //Update 
        var fields = ["`Name`","`ModifiedDate`"];
        var values = ["'"+req.body.txtname+"'","'"+currdate+"'"];
        var condition=[{'value':Id,'condition':'=','name':'Id'}];
        methods.addedit(tableName,fields,values,condition,req,res,function(data1){       
          res.writeHead(302,
          { 
            Location: '/branch'
          });
          res.end();
        });
      } 
      else
      { //Insert
        var fields = ["`Name`","`CreatedDate`","`ModifiedDate`"];
        var values = ["'"+req.body.txtname+"'","'"+currdate+"'","'"+currdate+"'"];
        methods.addedit(tableName,fields,values,[],req,res,function(data1){        
        res.writeHead(302,
        { 
          Location: '/branch'
        });
        res.end();
      });
    }
  }else{
    res.render('login');
  }
});
module.exports = app;