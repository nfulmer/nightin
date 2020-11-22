var mysql = require('mysql');

// local db connection
/*const dbhost = 'localhost';
const dbuser = 'root';
const dbpassword = 'password';
const dbname = 'nightin';*/

// heroku db connection
const dbhost = 'us-cdbr-east-02.cleardb.com';
const dbuser = 'bd990c26ef5f50';
const dbpassword = '361880a0';
const dbname = 'heroku_878810d484cc9b9';

var connection = mysql.createConnection({
    host: dbhost,
    user: dbuser, 
    password: dbpassword, 
    database: dbname,
    //insecureAuth: true
});

/* connection.connect(function(err) {
    if(!err) { console.log("Database is connected"); }
    else { console.log("Error Connecting" + err); }
}) */

module.exports = connection;