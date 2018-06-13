var express = require('express');
var connection = require('./jsfiles/db.js');
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
var path = require('path');

var urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './public/views');

var branch = require('./jsfiles/branch.js');
var department = require('./jsfiles/department.js');
var doctorCategory = require('./jsfiles/doctorcategory.js');
var doctor = require('./jsfiles/doctors.js');
var users = require('./jsfiles/users.js');
var dashboard = require('./jsfiles/dashboard.js');
var login = require('./jsfiles/login.js');
var logout = require('./jsfiles/logout.js');
var manageHospital = require('./jsfiles/manage-hospital');
var admin = require('./jsfiles/admin');
var patient = require('./jsfiles/patient');
var district = require('./jsfiles/selectdistrict');


app.use('/', branch);
app.use('/', department);
app.use('/', doctorCategory);
app.use('/', doctor);
app.use('/', users);
app.use('/', dashboard);
app.use('/', login);
app.use('/', logout);
app.use('/', manageHospital);
app.use('/', patient);
app.use('/', admin);
app.use('/', district);

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'public/views'));

 app.get('/', function (req, res) {
       res.render('login', {      
       
     });
 });

app.listen(process.env.PORT || 3000);