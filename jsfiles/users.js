var express = require('express');
var connection = require('./db.js');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var dateFormat = require('dateformat');
var parallel = require('run-parallel');
var bcrypt = require('bcrypt');
var methods = require('./index.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'public/views'));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './public/views');

// app.get('/', function(req, res, next) {
// res.render('login');
// });
// app.get('/forgot-pass', function(req, res, next) {
// res.render('forgot-pass');
// });


app.get('/add-users', function (req, res) {
  var Id = req.query.Id;
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
     var branchid = req.session.bid;
    }  
    if (req.session.email) {
      if(Id>0)
      {
        var fields = ["`ID`","`Email`","`Name`","`Address`","`MobileNo`","`Department`"];
        var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
        var tableName = "users";
        methods.getsinglerecord(tableName,fields,condition,req,res,function(data1){
          var fields = ["`ID`", "`Name`"];
          var tableName = "departments";
          var condition = [{ 'value': branchid, 'condition': '=', 'name': 'branchid' }];
          methods.getdropdown(tableName, fields, condition, req, res, function (data) {
            res.render('add-users', {
              data: data,
              Id: Id,
              users: data1
            });
          });
        });
      }
    else
    {
      var fields = ["`ID`","`Name`"];
      var tableName = "departments";
      var condition = [{ 'value': branchid, 'condition': '=', 'name': 'branchid' }];
      methods.getdropdown(tableName,fields,condition,req,res,function(data){ 
        res.render('add-users',{
          data:data,
          Id:Id
        });
      });
    }
  }else{
    res.render('login');
  }
}); 

app.get('/search-users', function (req, res) {
  if (req.session.email) {  
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
    var searchName=req.query.searchName;
    var tableName="users";                                    //SEARCHING
    var fields=['Id','Email','Name','Address'];
    var condition = [{ 'value': "'" + searchName + "'", 'condition': ' LIKE ', 'name': 'Name' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }]; 
    methods.listing(tableName,fields,condition,req,res,searchName,function(data1){
    });
  }else{
    res.render('login');
  }
});   

app.get('/users', function (req, res) {
  if (req.session.email) { 
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
    var fields=['Id','Email','Name','MobileNo'];         //LISTING
    var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
    var tableName="users";
    methods.listing(tableName,fields,condition,req,res,function(data1){
    });
  }else{
    res.render('login');
  }
});   

app.get('/delete-users', function (req, res) {  
  if (req.session.email) {
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
    var Id=req.query.Id;
    var tableName="users";                                //DELETE
    var fields = ["`IsDelete`"];
    var values = ["'"+ 1 +"'"];
    var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
    methods.deletion(tableName,fields,values,condition,req,res,function(data1){      
      res.writeHead(302,
      { 
        Location: '/users'
      });
      res.end();   
    });
  }else{
    res.render('login');
  }
});  

app.post('/add-users', urlencodedParser, function (req, res) {
  if (req.session.email) { 
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
    var datetime = new Date();
    var currdate = dateFormat(datetime, "yyyy-mm-dd hh:MM:ss");          //INSERT AND EDIT 
    var Id = req.query.Id;
    var tableName = "users";
    if(Id>0)
    {  //Update 
      var pass = bcrypt.hashSync(req.body.txtpass,5);
      var fields = ["`Email`","`Password`","`Name`","`Address`","`MobileNo`","`Department`"];
      var values = ["'"+req.body.txtemail+"'","'"+pass+"'","'"+req.body.txtname+"'","'"+req.body.txtaddress+"'","'"+req.body.txtmob+"'","'"+req.body.name+"'"];
      var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
      methods.addedit(tableName,fields,values,condition,req,res,function(data1){    
        res.writeHead(302,
        { 
          Location:'/users'
        });
        res.end();
      });
    } 
    else
    { //Insert
      var pass = bcrypt.hashSync(req.body.txtpass,5);
      var fields = ["`Email`", "`Password`", "`Name`", "`Address`", "`MobileNo`", "`Department`", "`LastLoggedIn`", "`CreatedDate`", "`ModifiedDate`", "`branchid`"];
      var values = ["'" + req.body.txtemail + "'", "'" + pass + "'", "'" + req.body.txtname + "'", "'" + req.body.txtaddress + "'", "'" + req.body.txtmob + "'", "'" + req.body.Name + "'", "'" + currdate + "'", "'" + currdate + "'", "'" + currdate + "'", "'" + branchid + "'"];
      methods.addedit(tableName,fields,values,[],req,res,function(data1){   
        res.writeHead(302,
        { 
          Location:'/users'
        });
        res.end();
      });
    }
  }else{
    res.render('login');
  }
});

/*app.post('/login',urlencodedParser, function (req, res){
var email =req.body.txtemail;
var  password =req.body.txtpass;                                       //login
var fields=['Id','Email','Password','Name','MobileNo'];       
var condition=[{'value': "'"+email+"'" ,'condition':' LIKE ','name':'Email'}]; 
var tableName="users";
crudFunctrions.loginFunction(tableName,fields,condition,password,req,res,function(data1){
});
});


app.post('/forgot-pass',urlencodedParser, function (req, res){
var email =req.body.txtemail;
var condition=[{'value': "'"+email+"'" ,'condition':' LIKE ','name':'Email'}]; 
var fields=['Id','Email','Password','Name','MobileNo'];                                //forgot password
var tableName="users";
crudFunctrions.forgotPass(tableName,fields,condition,req,res,function(data1){
});
});

*/
module.exports = app;