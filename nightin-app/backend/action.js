const connection = require('./config.js');
// const bcrypt = require('bcrypt');

// insert sign up values into the database user table
exports.signupuser = (req, res) => {
    var selectString = "SELECT concat(firstname, ' ', lastname) as name FROM user WHERE login = '" + req.body.email +  "';";
    connection.query(selectString, function(err, results) {
        var string = JSON.stringify(results);
        if(string === '[]' || string == undefined) { // email not found in database - continue with sign up
            // var hashpass = bcrypt.hashSync(req.body.pass , 10);
            var insertString = "INSERT INTO user VALUES('" + req.body.email + "', '" + req.body.pass + "', '" + req.body.fname + "', '" + req.body.lname + "');"
            connection.query(insertString, function(err, results) {
                var string = JSON.stringify(results);
                if(string === '[]') { res.json( [{result:'UPDATE_FAILED'}]); } // missing information
                else { res.json( [{result:'UPDATE_SUCCESS'}]); } // sign up completed
            });
        }
        else{ res.json([{result:'USER_ALREADY_EXISTS'}]); } // email already found in database
    });
};

// verify that user login information is correct
exports.verifyuser = (req, res) => {
    // var hashpass = bcrypt.hashSync(req.body.pass , 10);
    var selectString = "SELECT concat(firstname, ' ', lastname) as name, login FROM user WHERE login = '" + req.body.email + "' AND pass = '" + req.body.pass + "';";
    console.log(selectString);
    connection.query(selectString, function(err, results) {
        console.log(results);
        var string = JSON.stringify(results);
        if(string === '[]') { res.json([{name:'NOT_FOUND'}]); } // email not found in the database
        else { res.json(results); } // email and password are correct match
    });
};

// change the user's password
exports.updatepassword = (req, res) => {
    // var hashpassold = bcrypt.hashSync(req.body.passold , 10);
    // var hashpassnew = bcrypt.hashSync(req.body.passnew , 10);
    var updateString = "UPDATE user SET pass='" + req.body.passnew + "' WHERE login = '" + req.body.email + "' AND pass = '" + req.body.passold + "';";
    connection.query(updateString, function(err, results) {
        if(results.affectedRows == 1) { res.json(true); } // email and old password are found - update with new password
        else { res.json(false); } // email and old password not found
    });
};

// delete the user's account
exports.deleteuser = (req, res) => {
    var deleteMovie = "DELETE FROM movie WHERE login = '" + req.body.email + "';";
    // console.log(deleteMovie);
    connection.query(deleteMovie, function(err, results) {
        // console.log("MOVIE RESULTS: " + results[0]);
    });
    var deleteRecipe = "DELETE FROM recipe WHERE login = '" + req.body.email + "';";
    // console.log(deleteRecipe);
    connection.query(deleteRecipe, function(err, results) {
        // console.log("RECIPE RESULTS: " + results[0]);
    });
    //var hashpass = bcrypt.hashSync(req.body.pass , 10);
    var deleteString = "DELETE FROM user WHERE login = '" + req.body.email + "' AND pass = '" + req.body.pass + "';";
    connection.query(deleteString, function(err, results) {
        if(results.affectedRows == 1) { res.json(true); } // email and password are correct match
        else { res.json(false); } // error in email and password entered
    });
};

exports.addMovie = (req, res) => {
    
    var insertString = "INSERT INTO movie VALUES('" + req.body.login + "', '" + req.body.id + "');";
    connection.query(insertString, function(err, results) {
        var string = JSON.stringify(results);
        if(string === '[]') { res.json( [{result:'UPDATE_FAILED'}]); }
        else { res.json( [{result:'UPDATE_SUCCESS'}]); }
    });
};

exports.getmovies = (req, res) => {
    var selectString = "SELECT movieid FROM movie WHERE login = '" + req.body.login +  "';";
    connection.query(selectString, function(err, results) {
        var string = JSON.stringify(results);
        if(string === '[]'){ res.json([{result:'NO_FAVORITES'}]); }
        else{ res.json(string);}
    });
};

exports.addrecipe = (req, res) => {
    var insertString = "INSERT INTO recipe VALUES('" + req.body.login + "', '" + req.body.title + "', '" + req.body.link + "');";
    connection.query(insertString, function(err, results) {
        var string = JSON.stringify(results);
        if(string === '[]') { res.json( [{result:'UPDATE_FAILED'}]); }
        else { res.json( [{result:'UPDATE_SUCCESS'}]); }
    });
};

exports.getrecipes = (req, res) => {
    var selectString = "SELECT title, link FROM recipe WHERE login = '" + req.body.login +  "';";
    connection.query(selectString, function(err, results) {
        var string = JSON.stringify(results);
        if(string === '[]') { res.json([{result:'NO_FAVORITES'}]); }
        else{ res.json(string); }
    });
};

exports.getuserprofile = (req, res) => {
    var selectString = "SELECT firstname, lastname, login FROM user WHERE login = '" + req.body.email +  "';";
    connection.query(selectString, function(err, results) {
        var string = JSON.stringify(results);
        if(string === '[]') { res.json([{name:'NOT_FOUND'}]); }
        else { res.json(results); }
    });
};