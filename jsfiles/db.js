// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "hospital"
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected to 3000!");
// });
// module.exports = con;
const { Client } = require('pg');

const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to pg database");
});
module.exports = con;