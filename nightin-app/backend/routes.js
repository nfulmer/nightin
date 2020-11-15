const express = require('express');
const action = require('./action.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('index.html', {'root': __dirname + '/../frontend'});
});

router.get('/index', (req, res) => {
    res.sendFile('index.html', {'root': __dirname + '/../frontend'});
});

router.get('/moviesandrecipes', (req, res) => {
    res.sendFile('moviesandrecipes.html', {'root': __dirname + '/../frontend'});
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', {'root': __dirname + '/../frontend'});
});

router.get('/signup', (req, res) => {
    res.sendFile('signup.html', {'root': __dirname + '/../frontend'});
});

router.get('/contact', (req, res) => {
    res.sendFile('contact.html', {'root': __dirname + '/../frontend'});
});

router.post('/signupuser', action.signupuser);
router.post('/verifyuser', action.verifyuser);
router.post('/updatepassword', action.updatepassword);
router.post('/deleteuser', action.deleteuser);

module.exports = router;