const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'sakila',
  insecureAuth : true
});


connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM actor", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
