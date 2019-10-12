"use strict";

require('@babel/polyfill');

require('dotenv').config(); // Connect to the database


var CONNECT_STRING = "mongodb+srv://monkey:".concat(process.env.DB_PASSWORD, "@cluster0-hjmzm.gcp.mongodb.net/test?retryWrites=true&w=majority");

var mongoose = require('mongoose');

mongoose.connect(CONNECT_STRING, {
  useNewUrlParser: true
}); // Setup express server

var express = require('express');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // Setup routers
// Start server

app.listen(3001, function () {
  console.log('Server started on port 3001');
});