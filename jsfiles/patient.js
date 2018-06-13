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

var Id;
app.get('/add-patient', function (req, res) {
   
    Id = req.query.Id;

    if (req.session.branchid) {
        var branchid = req.session.branchid;
    } else {
        var branchid = req.session.bid;
    }
    if (req.session.email) {
        if (Id > 0) {
            var fields = ['branchid', 'name', 'gender', 'present_address', 'permenent_address', 'mobile_no', 'email', 'occupation', 'dob', 'son_of', 'patient_description', 'doctor_room', 'height', 'blood_group', 'weight', 'citizenship', 'department', 'CreatedDate', 'ModifiedDate', 'present_city', 'present_state', 'present_district', 'present_pin', 'permenent_city', 'permenent_state', 'permenent_district','permenent_pin'];
            var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
            var tableName = "patient";
            methods.getsinglerecord(tableName, fields, condition, req, res, function (data1) {
                var fields = ["`Id`", "`Name`"];
                var tableName = "departments";
                var condition = [{ 'value': branchid, 'condition': '=', 'name': 'branchid' }];
                methods.getdropdown(tableName, fields, condition, req, res, function (data) {
                    var fields = ["`Id`", "`Name`"];
                    var tableName = "doctorcategories";
                    var condition = [{ 'value': branchid, 'condition': '=', 'name': 'branchid' }];
                    methods.getdropdown(tableName, fields, condition, req, res, function (data2) { 
                        var fields = ["`Id`", "`Name`"];
                        var tableName = "bloodgroup";
                        var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                        methods.getdropdown(tableName, fields, condition, req, res, function (data3) {
                            var fields = ["`Id`", "`Name`"];
                            var tableName = "states";
                            var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                            methods.getdropdown(tableName, fields, condition, req, res, function (data4) {
                                var fields = ["`Id`", "`Name`"];
                                var tableName = "districts";
                                var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                                methods.getdropdown(tableName, fields, condition, req, res, function (data5) {
                                    res.render('add-patient', {
                                        data: data,
                                        Id: Id,
                                        users: data1,
                                        category: data2,
                                        bloodgroup: data3,   
                                        state: data4,
                                        district: data5                     
                                    });
                                 });
                            });
                        });
                        
                    });
                });
            });
        } else{
            var fields = ["`Id`", "`Name`"];
            var tableName = "departments";
            var condition = [{ 'value': branchid, 'condition': '=', 'name': 'branchid' }];
            methods.getdropdown(tableName, fields, condition, req, res, function (data) {
                var fields = ["`Id`", "`Name`"];
                var tableName = "doctorcategories";
                var condition = [{ 'value': branchid, 'condition': '=', 'name': 'branchid' }];
                methods.getdropdown(tableName, fields, condition, req, res, function (data2) { 
                    var fields = ["`Id`", "`Name`"];
                    var tableName = "bloodgroup";
                    var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                    methods.getdropdown(tableName, fields, condition, req, res, function (data3) { 
                        var fields = ["`Id`", "`Name`"];
                        var tableName = "states";
                        var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                        methods.getdropdown(tableName, fields, condition, req, res, function (data4) {
                            var fields = ["`Id`", "`Name`"];
                            var tableName = "districts";
                            var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }];
                            methods.getdropdown(tableName, fields, condition, req, res, function (data5) {
                            res.render('add-patient', {
                            data: data,
                            Id: Id,
                            category: data2,
                            bloodgroup:data3,
                            state:data4,
                            district: data5,

                });
                            });
                        });
            });
                });
        });
    }
 } else {
        res.render('login');
    }
});

app.get('/search-patient', function (req, res) {
    if (req.session.branchid) {
        var branchid = req.session.branchid;
    } else {
        var branchid = req.session.bid;
    }
    if (req.session.email) {
        var searchName = req.query.searchName;
        var tableName = "patient";                                    //SEARCHING
        var fields = ['branchid', 'name', 'gender', 'present_address', 'permenent_address', 'mobile_no', 'email', 'occupation', 'dob', 'son_of', 'patient_description', 'doctor_room', 'height', 'blood_group', 'weight', 'citizenship', 'department', 'CreatedDate', 'ModifiedDate'];
        var condition = [{ 'value': "'" + searchName + "'", 'condition': ' LIKE ', 'name': 'Name' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
        methods.listing(tableName, fields, condition, req, res, searchName, function (data1) {
            res.render('patient', {
                users: data1,
                Id: Id
            });
        });
    } else {
        res.render('login');
    }
});

app.get('/patient', function (req, res) {
    var Id = req.query.Id;
    if (req.session.branchid) {
        var branchid = req.session.branchid;
    } else {
        var branchid = req.session.bid;
    }
    if (req.session.email) {
        var fields = ['id','branchid', 'name', 'gender', 'present_address', 'permenent_address', 'mobile_no', 'email', 'occupation', 'dob', 'son_of', 'patient_description', 'doctor_room', 'height', 'blood_group', 'weight', 'citizenship', 'department', 'CreatedDate', 'ModifiedDate'];                                    //LISTING
        var condition = [{ 'value': '0', 'condition': '=', 'name': 'IsDelete' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
        var tableName = "patient";
        methods.listing(tableName, fields, condition, req, res, function (data1) {
            res.render('patient', {
                users: data1,
                Id: Id
            });
        });
    } else {
        res.render('login');
    }
});

app.get('/delete-patient', function (req, res) {
    //var branchid = req.session.branchid;
    if (req.session.email) {
        var Id = req.query.Id;
        if (req.session.branchid) {
            var branchid = req.session.branchid;
        } else {
            var branchid = req.session.bid;
        }
        var tableName = "patient";                                //DELETE
        var fields = ["`IsDelete`"];
        var values = ["'" + 1 + "'"];
        var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
        methods.deletion(tableName, fields, values, condition, req, res, function (data1) {
            res.writeHead(302,
                {
                    Location: '/patient'
                });
            res.end();
        });
    } else {
        res.render('login');
    }
});   



app.post('/add-patient', urlencodedParser, function (req, res) {
    if (req.session.email) {
        if (req.session.branchid) {
            var branchid = req.session.branchid;
        } else {
            var branchid = req.session.bid;
        }
        var datetime = new Date();
        var currdate = dateFormat(datetime, "yyyy-mm-dd hh:MM:ss");          //INSERT AND EDIT 

        var tableName = "patient"; 
       
        if (Id > 0) {  //Update 
          
            var fields = ['branchid', 'name', 'gender', 'present_address', 'permenent_address', 'mobile_no', 'email', 'occupation', 'dob', 'son_of', 'patient_description', 'doctor_room', 'height', 'blood_group', 'weight', 'citizenship', 'department', 'ModifiedDate', 'present_city', 'present_state', 'present_district', 'present_pin', 'permenent_city', 'permenent_state', 'permenent_district', 'permenent_pin', 'age'];
            var values = ["'" + branchid + "'", "'" + req.body.txtprename + "'", "'" + req.body.gender + "'", "'" + req.body.present_address + "'", "'" + req.body.permenant_address + "'", "'" + req.body.txtmobile + "'", "'" + req.body.txtemail + "'", "'" + req.body.occupation + "'", "'" + req.body.dob + "'", "'" + req.body.txtsonof + "'", "'" + req.body.patient_description + "'", "'" + req.body.doctorsRoom + "'", "'" + req.body.txtheight + "'", "'" + req.body.bloodgroup + "'", "'" + req.body.txtweight + "'", "'" + req.body.citizenship + "'", "'" + req.body.department + "'", "'" + currdate + "'", "'" + req.body.txtcity + "'", "'" + req.body.statedropdown + "'", "'" + req.body.districtdropdown + "'", "'" + req.body.txtpin + "'", "'" + req.body.citytxt + "'", "'" + req.body.dropdownstate + "'", "'" + req.body.dropdowndistrict + "'", "'" + req.body.pintxt + "'", "'" + req.body.txtage + "'"];
            var condition = [{ 'value': Id, 'condition': '=', 'name': 'Id' }, { 'value': branchid, 'condition': '=', 'name': 'branchid' }];
            methods.addedit(tableName, fields, values, condition, req, res, function (data1) {
                res.writeHead(302,
                    {
                        Location: '/patient'
                    });
                res.end();
        });
        }
        else { //Insert
           
            var fields = ['branchid', 'name', 'gender', 'present_address', 'permenent_address', 'mobile_no', 'email', 'occupation', 'dob', 'son_of', 'patient_description', 'doctor_room', 'height', 'blood_group', 'weight', 'citizenship', 'department', 'CreatedDate', 'ModifiedDate', 'present_city', 'present_state', 'present_district', 'present_pin', 'permenent_city', 'permenent_state', 'permenent_district', 'permenent_pin','age'];
            var values = ["'" + branchid + "'", "'" + req.body.txtprename + "'", "'" + req.body.gender + "'", "'" + req.body.present_address + "'", "'" + req.body.permenant_address + "'", "'" + req.body.txtmobile + "'", "'" + req.body.txtemail + "'", "'" + req.body.occupation + "'", "'" + req.body.dob + "'", "'" + req.body.txtsonof + "'", "'" + req.body.patient_description + "'", "'" + req.body.doctorsRoom + "'", "'" + req.body.txtheight + "'", "'" + req.body.bloodgroup + "'", "'" + req.body.txtweight + "'", "'" + req.body.citizenship + "'", "'" + req.body.department + "'", "'" + currdate + "'", "'" + currdate + "'", "'" + req.body.txtcity + "'", "'" + req.body.statedropdown + "'", "'" + req.body.districtdropdown + "'", "'" + req.body.txtpin + "'", "'" + req.body.citytxt + "'", "'" + req.body.dropdownstate + "'", "'" + req.body.dropdowndistrict + "'", "'" + req.body.pintxt + "'", "'" + req.body.txtage + "'"];
            methods.addedit(tableName, fields, values, [], req, res, function (data1) {
                res.writeHead(302,
                    {
                        Location: '/patient'
                    });
                res.end();
            });
        }
    } else {
        res.render('login');
    }
});
module.exports = app;