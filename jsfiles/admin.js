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
var ip = require('ip');

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


app.get('/add-admin', function (req, res) {
    var Id = req.query.Id;
    if (req.session.branchid) {
        var branchid = req.session.branchid;
    } else {
        var branchid = req.session.bid;
    }
    if (req.session.email) {
        if (Id > 0) {
            var fields = ["`email`", "`password`", "`name`", "`roll`", "`bid`"];
            var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': 1, 'condition': '!=', 'name': 'roll' }];
            var tableName = "admin";
            methods.getsinglerecord(tableName, fields, condition, req, res, function (data1) {
                var fields = ["`Id`", "`Name`"];
                var tableName = "branch";
                var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                methods.getdropdown(tableName, fields, condition, req, res, function (data) {
                    res.render('add-admin', {
                        users:data1,
                        data: data,
                        Id: Id
                    });
                });
            });
        }
        else {
            var fields = ["`Id`", "`Name`"];
            var tableName = "branch";
            var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
            methods.getdropdown(tableName, fields, condition, req, res, function (data) {
                res.render('add-admin', {
                    data: data,
                     Id: Id
                });
            });
        }
    } else {
        res.render('login');
    }
});

app.post('/add-admin', urlencodedParser, function (req, res) {
    if (req.session.email) {
        var branchid = req.session.branchid;
        var datetime = new Date();
        var currdate = dateFormat(datetime, "yyyy-mm-dd hh:MM:ss");          //INSERT AND EDIT 
        var Id = req.query.Id;
        var ipaddress = ip.address();
        var tableName = "admin";
        if (Id > 0) {  //Update 
            //var pass = bcrypt.hashSync(req.body.txtpass, 5);
            var fields = ["`email`", "`password`", "`name`", "`roll`", "`bid`", "`CreatedDate`", "`ModifiedDate`", "`system_ip`"];
            var values = ["'" + req.body.txtemail + "'", "'" + req.body.txtpass + "'", "'" + req.body.txtname + "'", "'" + req.body.RollName + "'", "'" + req.body.bname + "'", "'" + currdate + "'", "'" + currdate + "'", "'" + ipaddress + "'"];
            var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }];
            methods.addedit(tableName, fields, values, condition, req, res, function (data1) {
                res.writeHead(302,
                    {
                        Location: '/admin'
                    });
                res.end();
            });
        }
           else { //Insert
            //var pass = bcrypt.hashSync(req.body.txtpass, 5);
            var fields = ["`email`", "`password`", "`name`","`roll`", "`bid`","`CreatedDate`", "`ModifiedDate`", "`system_ip`"];
            var values = ["'" + req.body.txtemail + "'", "'" + req.body.txtpass + "'", "'" + req.body.txtname + "'", "'" + req.body.RollName + "'","'" + req.body.bname + "'", "'" + currdate + "'", "'" + currdate + "'", "'" + ipaddress + "'"];
            methods.addedit(tableName, fields, values, [], req, res, function (data1) {
                // var fields = ['Id', 'Name'];                                      //LISTING
                // var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                // var tableName = "branch";               
                // methods.manageHospital(tableName, fields, condition, req, res, function (data) {
                //     res.render('manage-hospital', {
                //         users: data,
                //     });
                res.writeHead(302,
                    {
                        Location: '/admin'
                    });
                res.end();                    
               // });                
            });       
        }
    } else {
        res.render('login');
    }
});

app.get('/admin', function (req, res) {
    var Id = req.query.Id;
    if (req.session.branchid) {
        var branchid = req.session.branchid;
    } else {
        var branchid = req.session.bid;
    }
    if (req.session.email) {
        var fields = ['id', 'name'];                                      //LISTING
        var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }, { 'value': 1, 'condition': '!=', 'name': 'roll' }];
        var tableName = "admin";
        methods.listing(tableName, fields, condition, req, res, function (data1) {
            res.render('admin', {
                users: data1,
                Id: Id
            });
        });
    } else {
        res.render('login');
    }
});


app.get('/search-admin', function (req, res) {
    if (req.session.email) {
        var searchName = req.query.searchName;
        var tableName = "admin";                                    //SEARCHING
        var fields = ['Id', 'Name'];
        var condition = [{ 'value': "'" + searchName + "'", 'condition': ' LIKE ', 'name': 'Name' }];
        methods.listing(tableName, fields, condition, req, res, searchName, function (data1) {
        });
    } else {
        res.render('login');
    }
});

app.get('/delete-admin', function (req, res) {
    if (req.session.email) {
        var Id = req.query.Id;
        var tableName = "admin";                                //DELETE
        var fields = ["`IsDelete`"];
        var values = ["'" + 1 + "'"];
        var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }];
        methods.deletion(tableName, fields, values, condition, req, res, function (data1) {
            res.writeHead(302,
                {
                    Location: '/admin'
                });
            res.end();
        });
    } else {
        res.render('login');
    }
});

module.exports = app;