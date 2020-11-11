const connection = require('./config.js');

exports.verifyuser = (req, res) => {
    console.log('checking user in database');
    console.log('email: ' + req.body.email);
    console.log('password: ' + req.body.pass);

    var selectString = "SELECT login, pass, firstname, lastname FROM user WHERE login = '" + req.body.email + "' AND pass = '" + req.body.pass + "';";
    console.log(selectString);

    connection.query(selectString, function(err, results) {
        console.log(results);
        var string = JSON.stringify(results);
        console.log(string);
        if(string === '[]') { res.json(false); }
        else { res.json(true); }
    });
};

exports.signupuser = (req, res) => {
    console.log('checking user in database');
    console.log('first name: ' + req.body.fname);
    console.log('last name: ' + req.body.lname);
    console.log('email: ' + req.body.email);
    console.log('password: ' + req.body.pass);

    var insertString = "INSERT INTO user VALUES('" + req.body.email + "', '" + req.body.pass + "', '" + req.body.fname + "', '" + req.body.lname + "');"
    console.log(insertString);

    connection.query(insertString, function(err, results) {
        var string = JSON.stringify(results);
        console.log(string);
        // console.log(string["affectedRows"]);
        if(string === '[]') { res.json(false); }
        else { res.json(true); }
    });
};