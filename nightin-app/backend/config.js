var mysql = require('mysql');

// local db connection
/* const dbhost = 'localhost';
const dbuser = 'root';
const dbpassword = 'password';
const dbname = 'nightin'; */

// heroku db connection
const dbhost = 'us-cdbr-east-02.cleardb.com';
const dbuser = 'bd990c26ef5f50';
const dbpassword = '361880a0';
const dbname = 'heroku_878810d484cc9b9';

// connect to database
var connection = mysql.createPool({
    host: dbhost,
    user: dbuser, 
    password: dbpassword, 
    database: dbname
});

module.exports = connection;