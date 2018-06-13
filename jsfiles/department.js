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
// var sess;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/add-department', function (req, res) {
  var Id = req.query.Id;
  
  if (req.session.branchid){
    var branchid = req.session.branchid;
  }else{
    var branchid = req.session.bid;
  }
  if (req.session.email) {
    if(Id>0)
    {
      var fields = ["`Name`","`ModifiedDate`"];
      var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
      var tableName = "departments";
      methods.getsinglerecord(tableName,fields,condition,req,res,function(data1){
        if(data1.length>0){
        res.render('add-department',{
          users:data1,
          Id:Id
        }); 
      }else{
        res.render('/department');
      } 
      });
    }
    else
    {
      res.render('add-department', {
      Id:Id
      });
    }
  }else{
    res.render('login');
  }
}); 

app.get('/search-department', function (req, res) { 
  if (req.session.branchid) {
    var branchid = req.session.branchid;
  } else {
    var branchid = req.session.bid;
  }
  if (req.session.email) {
    var searchName=req.query.searchName;
    var tableName="departments";                                    //SEARCHING
    var fields=['Id','Name','CreatedDate','ModifiedDate'];
    var condition = [{ 'value': "'" + searchName + "'", 'condition': ' LIKE ', 'name': 'Name' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }]; 
    methods.listing(tableName,fields,condition,req,res,searchName,function(data1){               
      res.render('department',{
      users:data1,
      Id:Id
      });   
    });
  }else{
    res.render('login');
  }
});   

app.get('/department', function (req, res) { 
  var Id = req.query.Id;
  if (req.session.branchid) {
    var branchid = req.session.branchid;
  } else {
    var branchid = req.session.bid;
  }
  if (req.session.email) { 
    var fields=['Id','Name'];                                      //LISTING
    var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' },{ 'value': branchid , 'condition': '=', 'name': 'branchid' }];
    var tableName="departments";
    methods.listing(tableName,fields,condition,req,res,function(data1){
      res.render('department',{
        users:data1,
        Id:Id
      });  
    });
  }else{
    res.render('login');
  }
});   

app.get('/delete-department', function (req, res) {  
  //var branchid = req.session.branchid;
  if (req.session.email) {
    var Id=req.query.Id;
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
    var tableName="departments";                                //DELETE
    var fields = ["`IsDelete`"];
    var values = ["'"+ 1 +"'"];
    var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
    methods.deletion(tableName,fields,values,condition,req,res,function(data1){        
      res.writeHead(302,
          { 
            Location: '/department'
          });
      res.end();  
    });  
  }else{
    res.render('login');
  }
});   

app.post('/add-department', urlencodedParser, function (req, res) {
  if (req.session.email) {
    var datetime = new Date();
    var currdate = dateFormat(datetime, "yyyy-mm-dd hh:MM:ss");          //INSERT AND EDIT 
    currdate = currdate.toString();
    var Id = req.query.Id;
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
    var tableName = "departments";
    if(Id>0)
    {  //Update
      var fields = ["`Name`", "`ModifiedDate`"];
      var values = ["'" + req.body.txtdeptname + "'", "'" + currdate + "'"];
      var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
      methods.addedit(tableName,fields,values,condition,req,res,function(data1){  
        res.writeHead(302,
        { 
          Location: '/department'
        });
        res.end();   
      });
   } 
   else
   { //Insert
      var fields = ["`Name`", "`CreatedDate`", "`ModifiedDate`", "`branchid`"];
      var values = ["'" + req.body.txtdeptname + "'", "'" + currdate + "'", "'" + currdate + "'", "'" + branchid + "'"];
      methods.addedit(tableName,fields,values,[],req,res,function(data1){        
        res.writeHead(302,
        { 
          Location: '/department'
        });
        res.end();   
      });
    }
  }else{
    res.render('login');
  }
});
module.exports = app;
