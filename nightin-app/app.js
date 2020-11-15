const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./backend/routes.js');

const app = express();

app.use(express.static(__dirname + '/frontend'));
app.use(bodyparser.json());
app.use('/', routes);

module.exports = app;