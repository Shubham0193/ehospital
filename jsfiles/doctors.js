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

app.get('/add-doctors', function (req, res) {
 var Id = req.query.Id;
  if (req.session.branchid) {
    var branchid = req.session.branchid;
  } else {
    var branchid = req.session.bid;
  }
  if (req.session.email) {
    if(Id>0)  //check whether the value of Id is present or not if yes then calling of get singel record function at the time of page load 
    {                    
      var fields=['PreName','Name','Degree','DoctorCategory','MobileNo','Address','Telephone_Office','Telephone_Residence','Email','CreatedDate','ModifiedDate'];
      var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id', 'con': '||' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
      var tableName = "doctors";
      methods.getsinglerecord(tableName,fields,condition,req,res,function(data1){
        var fields = ["`Id`","`Name`"];
        var tableName = "doctorcategories";
        var condition = [{ 'value': branchid, 'condition': '=', 'name': 'branchid' }];
        methods.getdropdown(tableName, fields, condition, req, res, function (data) {
          res.render('add-doctor', {
            data: data,
            Id: Id, 
            users: data1
          });
        });     
      });
    }
    else  //If Id is not present then renders to add-record page
    {          
      var fields = ["`Id`","`Name`"];
      var tableName = "doctorcategories";
      var condition = [{ 'value': branchid, 'condition': '=', 'name': 'branchid' }];
      methods.getdropdown(tableName,fields,condition,req,res,function(data){ 
        res.render('add-doctor',{
          data:data,
          Id:Id
        });
      });
    }
  }else{
    res.render('login');
  }
});  

//calling to search functionality..
app.get('/search-doctors', function (req, res) {  
  if (req.session.email) {
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
    var searchName=req.query.searchName;
    var tableName="doctors";                                    //SEARCHING
    var fields=['PreName','Name','Degree','DoctorCategory','MobileNo','Telephone_Office','Telephone_Residence'];
    var condition = [{ 'value': "'" + searchName + "'", 'condition': ' LIKE ', 'name': 'Name' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }]; 
    methods.listing(tableName,fields,condition,req,res,searchName,function(data1){
    });
  }else{
    res.render('login');
  }
});   
//end of search functionality

//calling to listing functionality..
app.get('/doctors', function (req, res) {  
  if (req.session.email) {
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
   var fields=['Id','PreName','Name','DoctorCategory','MobileNo','Telephone_Office','Telephone_Residence'];         //LISTING
    var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
   var tableName="doctors";
   methods.listing(tableName,fields,condition,req,res,function(data1){
  });
}else{
  res.render('login');
}
});   
//end of search functionality

//calling to listing functionality..
app.get('/delete-doctors', function (req, res) {  
  if (req.session.branchid) {
    var branchid = req.session.branchid;
  } else {
    var branchid = req.session.bid;
  }
  if (req.session.email) {
    var Id=req.query.Id;
    var tableName ="doctors";                                //DELETE
    var fields = ["`IsDelete`"];
    var values = ["'"+ 1 +"'"];
    var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
    methods.deletion(tableName,fields,values,condition,req,res,function(data1){         
      res.writeHead(302,
        { 
          Location: '/doctors'
        });
      res.end();
    });
  }else{
    res.render('login');
  }
});   

//end of listing functionality
//calling to add and edit  functionality..
app.post('/add-doctors', urlencodedParser, function (req, res) {
  if (req.session.email) {
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
    var datetime = new Date();
    var currdate = dateFormat(datetime, "yyyy-mm-dd hh:MM:ss");          //INSERT AND EDIT 
   
    var Id = req.query.Id;
    console.log("Id----->", Id);
    
    var tableName = "doctors";
    if(Id>0)
    {  //Update 
      var fields=['PreName','Name','Degree','DoctorCategory','MobileNo','Address','Telephone_Office','Telephone_Residence','Email','ModifiedDate'];
      var values = ["'"+req.body.txtprename+"'","'"+req.body.txtname+"'","'"+req.body.txtdegree+"'","'"+req.body.txtcategory+"'","'"+req.body.txtmobile+"'","'"+req.body.txtaddress+"'","'"+req.body.txtteloffice+"'","'"+req.body.txttelresident+"'","'"+req.body.txtemail+"'","'"+currdate+"'"];
      var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
      methods.addedit(tableName,fields,values,condition,req,res,function(data1){     
       res.writeHead(302,
       { 
          Location: '/doctors'
        });
        res.end();
      });
    } 
    else
    { //Insert
      var fields = ['PreName', 'Name', 'Degree', 'DoctorCategory', 'MobileNo', 'Address', 'Telephone_Office', 'Telephone_Residence', 'Email', 'CreatedDate', 'ModifiedDate', "`branchid`"];
      var values = ["'" + req.body.txtprename + "'", "'" + req.body.txtname + "'", "'" + req.body.txtdegree + "'", "'" + req.body.txtcategory + "'", "'" + req.body.txtmobile + "'", "'" + req.body.txtaddress + "'", "'" + req.body.txtteloffice + "'", "'" + req.body.txttelresident + "'", "'" + req.body.txtemail + "'", "'" + currdate + "'", "'" + currdate + "'", "'" + branchid + "'"];
      methods.addedit(tableName,fields,values,[],req,res,function(data1){       
        res.writeHead(302,
        { 
          Location: '/doctors'
        });
        res.end();
      });
    }
  }else{
    res.render('login');
  }
});
//end of add edit functionality
module.exports = app;