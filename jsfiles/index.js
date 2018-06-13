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
var path = require('path');

var session = require('express-session');
//app.use(session({ secret: 'ssshhhhh' }));
app.use(session({
  secret: 'ssshhhhh',
  resave: true,
  saveUninitialized: true
}));


/*****************************************start of functions********************************/
var methods = {  
//Function for listing for displaying records         using   annonaumous function
  listing:  function (tableName,fields,condition,req,res,callback)  
  {
    /*Start of  Session variables */
    var rollsession = req.session.roll;
    if (req.session.branchid) {
      var branchid = req.session.branchid;
    } else {
      var branchid = req.session.bid;
    }
     /*End of Session variables */
    var fullUrl = req.originalUrl;
    var adddata = fullUrl.substr(1);
    var sql="SELECT ";
    var con="";                     
    var value ="";
    var attrName ="";
    var str ="";
    var flag ="";
    var Id = req.query.Id;
    var searchName=req.query.searchName;
    if(searchName)
    {
      flag=1;
    }                   //Condition check for search name is present or not
    else
    {
      flag=0;
    }
    var pageNumber=req.query.page;
    var position= 0;                           
    var pageSize = 10;
    if(typeof pageNumber != 'undefined' && pageNumber != "") {    //Getting page size and page numbers
      position = parseInt([(pageNumber - 1) * pageSize]) ;            
    }
    var limit=[position,pageSize];
    //console.log(condition);
    for(index=0;index<condition.length;index++)
    {
      attrName = condition[index].name;
      value = condition[index].value;        //for loop for getting ehere clause to separatre Attribute name,Value and Condition
      con = condition[index].condition;
      if (index < (condition.length) - 1){
        str += attrName + con + value + " AND ";
      }else{
        str += attrName + con + value;
      }
      
    }
    //console.log("str---->",str);
    var position=limit[0];
    var pageSize=limit[1];
    if(tableName!=""){ 
      if(fields.length=='0')
      {                                //Check whether fields are present or not
        sql+=" * from "+tableName;        
      }
      else
      {
        sql+= fields + ' from ' + tableName;       
      }
      if(condition.length!=0)
      {
        sql+=' where ' + str;   //Check wheter condition is provided or not
      }
      //console.log(condition);
      //console.log(sql);
      connection.query(sql,
        function(err, result) {
          var recordLength = result.length;   //Find no. of records
          if(err) throw err;
          if(limit.length!=0)
          {
            sql+=' limit '+ position +','+ pageSize;  //Apply limit clause for pagination
            connection.query(sql,
              function(err, result) {                //Perform Query with limit
                if(err) throw err;                 
                var pages= recordLength/pageSize;  
                var ceil=Math.ceil(pages);    
                res.render('listing',{               //Render data for listing
                  size:searchName,                
                  pages:ceil,
                  users:result,
                  selection:flag,
                  fullUrl:fullUrl,
                  adddata:adddata,
                  rollsession: rollsession,
                  branchid: branchid
                });
              }
            );
          }     
        }
      );
    }
  },
  //End of listing functions
  //Start of get single record function used for filling form while edit operation
  getsinglerecord: function(tableName,fields,condition,req,res,callback)  //Function for Selection while edit operation
  { 
    var fullUrl = req.originalUrl;
    var adddata = fullUrl.substr(1);
    var qryresult;
    var sql="SELECT ";
    var con;
    var value;
    var attrName;
    var str = "";
    var Id = req.query.Id;
    for(index=0;index<condition.length;index++)
    {
      attrName=condition[index].name;
      value=condition[index].value;            //For loop for getting ehere clause to separatre Attribute name,Value and Condition
      con=condition[index].condition;
      if (index < (condition.length) - 1) {
        str += attrName + con + value + " AND ";
      } else {
        str += attrName + con + value;
      }
    }
    if(tableName!="")
    {
      if(fields.length=='0')
      { 
        sql+=" * from "+tableName;          //Check fields are provided or not
      }
      else
      {
        sql+= fields + ' from ' + tableName;     
      }
      if(condition.length!=0)
      {
        sql+=' where ' + str;   //Check condition is provided or not
      }
      connection.query(sql,                     //Perform query
        function(err, result) {     
          if(err) throw err;   
          callback(result);                         //Callback for return result to calling function
        }
      );
    }
  },
  //End of get single record functions
  //Start of get dropdown function used for filling DropDown list
  getdropdown:  function(tableName,fields,condition,req,res,callback)  
  {
    var sql="SELECT ";
    var Id = req.query.Id;
    var con;
    var value;
    var attrName;
    var str = "";

    for (index = 0; index < condition.length; index++) {
      attrName = condition[index].name;
      value = condition[index].value;            //For loop for getting ehere clause to separatre Attribute name,Value and Condition
      con = condition[index].condition;
      if (index < (condition.length) - 1) {
        str += attrName + con + value + " AND ";
      } else {
        str += attrName + con + value;
      }
    }

    if(tableName!=""){
      if(fields.length=='0')                    //Check whether fields are provided or not    
      { 
        sql+=" * from "+tableName;           // If fields are provided then apped them to query..
      }
      else
      {
        sql+= fields + ' from ' + tableName;    //If fields are not provided then fetch all records   
      }
      if (condition.length != 0) {
        sql += ' where ' + str;   //Check condition is provided or not
      }
      connection.query(sql,                  // Perform query               
        function(err, result) {
          if(err) throw err;                   
          callback(result);                    //Callback for return result to calling function
        }
      );
    }
  },

  //End of get dropdown function 
  //Start of delete function used for update IsDelete Attribute of a table
  deletion: function(tableName,fields,values,condition,req,res,callback)  //Function for Delete Operation
  {
    var sql="UPDATE ";
    var con;
    var value;
    var attrName;
    var str = "";
    sql  +=  tableName +  ' SET ' ;
    for(index=0;index<fields.length;index++)
    {
      sql+=   fields[index] + '=' +  values[index] +',';    //For lop for set values to fields for update
    }
    sql = sql.slice(0, -1);                                //slice() function for removing last COMMA from query
    for(index=0;index<condition.length;index++)
    {
      attrName=condition[index].name;
      value=condition[index].value;                        //For loop for getting where clause to separatre Attribute name,Value and Condition             
      con=condition[index].condition;
      if (index < (condition.length) - 1) {
        str += attrName + con + value + " AND ";
      } else {
        str += attrName + con + value;
      }
    }
    sql+=    ' where ' + str;        //Append wHERE condition 
    connection.query(sql,                               //Perform Query
      function(err, result) {      
        if (err) throw err;
        callback(result);                               //Callback for return result to calling function
      } 
    );
  },

  //End of delete function 
  //Start of addedit function used for adding new records in table and Update records
  addedit:  function (tableName,fields,values,condition,req,res,callback)   
  { 
    var Id = req.query.Id;
    var str = "";
    if(tableName!="")
    {
      if(condition=="")    //Check for Condition is present or not ,If not then perform Add operation                
      {
        var sql="INSERT INTO "
        sql  +=  tableName +'('+ fields +')'+ 'values' +'('+ values +')'   //Insert query  
      }
      else                //If condition is present then perform edit operation
      {
        var con;
        var value;
        var attrName;
        var sql="UPDATE ";
        sql  +=  tableName +  ' SET ' ;  
        for(index=0;index<fields.length;index++)
        {
          sql+=   fields[index] + '=' +  values[index] +',';     //For lop for set values to fields for update
        }
        sql = sql.slice(0, -1);                                //slice() function for removing last COMMA from query
        for(index=0;index<condition.length;index++)
        {
          attrName=condition[index].name;
          value=condition[index].value;                          //For loop for getting where clause to separatre Attribute name,Value and Condition                
          con=condition[index].condition;
          if (index < (condition.length) - 1) {
            str += attrName + con + value + " AND ";
          } else {
            str += attrName + con + value;
          }
        }
        sql+=    ' where ' +str;              //append where to query statement
      }
      //console.log(sql);
      connection.query(sql,                                     //perform query
        function (err, result) {
          if (err) throw err;
          callback(result);                                // Callback for return result to calling function
        }
      );
    }
  },
 //end of method
//End of add-edit function


manageHospital: function (tableName, fields, condition, req, res, callback) {
 
  
  var sql = "SELECT ";
  var con;
  var value;
  var attrName;
  var flag;
  var Id = req.query.Id;
  var str = "";
  
  for (index = 0; index < condition.length; index++) {
    attrName = condition[index].name;
    value = condition[index].value;        //for loop for getting ehere clause to separatre Attribute name,Value and Condition
    con = condition[index].condition;
    if (index < (condition.length) - 1) {
      str += attrName + con + value + " AND ";
    } else {
      str += attrName + con + value;
    }
  }
  if (tableName != "") {
    if (fields.length == '0') {                                //Check whether fields are present or not
      sql += " * from " + tableName;
    }
    else {
      sql += fields + ' from ' + tableName;
    }
    if (condition.length != 0) {
      sql += ' where ' + str;   //Check wheter condition is provided or not
    }
    connection.query(sql,
      function (err, result) {         
        if (err) throw err;
        callback(result);
          }
          );
        }
      }
    };
   


//***********End Of Functions*******************/

//module.exports = app;
//exports.data = methods;
module.exports = methods;