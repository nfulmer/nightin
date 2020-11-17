
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'password', 
    database: 'nightin',
    insecureAuth: true
});

/* connection.connect(function(err) {
    if(!err) { console.log("Database is connected"); }
    else { console.log("Error Connecting" + err); }
}) */

module.exports = connection;