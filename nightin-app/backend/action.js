const connection = require('./config.js');

exports.signupuser = (req, res) => {
    var selectString = "SELECT concat(firstname, ' ', lastname) as name FROM user WHERE login = '" + req.body.email +  "';";
    connection.query(selectString, function(err, results) {
        console.log(results);
        var string = JSON.stringify(results);
        if(string === '[]'){
            var insertString = "INSERT INTO user VALUES('" + req.body.email + "', '" + req.body.pass + "', '" + req.body.fname + "', '" + req.body.lname + "');"
            console.log(insertString);
            connection.query(insertString, function(err, results) {
                console.log(results);   
                var string = JSON.stringify(results);
                if(string === '[]') { res.json( [{result:'UPDATE_FAILED'}]); }
                else { res.json( [{result:'UPDATE_SUCCESS'}]); }
         });
    }
    else{
        res.json([{result:'USER_ALREADY_EXISTS'}]);
    }});
};

exports.verifyuser = (req, res) => {
    var selectString = "SELECT concat(firstname, ' ', lastname) as name FROM user WHERE login = '" + req.body.email + "' AND pass = '" + req.body.pass + "';";
    connection.query(selectString, function(err, results) {
        console.log(results);
        var string = JSON.stringify(results);
        if(string === '[]') { res.json([{name:'NOT_FOUND'}]); }
        else { res.json(results);  }
    });
};

exports.updatepassword = (req, res) => {
    var updateString = "UPDATE user SET pass='" + req.body.passnew + "' WHERE login = '" + req.body.email + "' AND pass = '" + req.body.passold + "';";
    console.log(updateString);
    connection.query(updateString, function(err, results) {
        var string = JSON.stringify(results);
        if(string === '[]') { res.json(false); }
        else { res.json(true); }
    });
};

exports.deleteuser = (req, res) => {
    var deleteString = "DELETE FROM user WHERE login = '" + req.body.email + "' AND pass = '" + req.body.pass + "';";
    connection.query(deleteString, function(err, results) {
        var string = JSON.stringify(results);
        if(string === '[]') { res.json(false); }
        else { res.json(true); }
    });
};