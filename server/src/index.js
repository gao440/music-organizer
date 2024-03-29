require('@babel/polyfill');
require('dotenv').config();

// Connect to the database
const CONNECT_STRING = `mongodb+srv://monkey:${process.env.DB_PASSWORD}@cluster0-hjmzm.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
mongoose.connect(CONNECT_STRING, { useNewUrlParser: true });

// Setup express server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Setup routers
app.use('/auth', require('./routes/authRouter'));
app.use('/playlists', require('./routes/playlistRouter'));
app.use('/tracks', require('./routes/trackRouter'));
app.use('/faces', require('./routes/faceRouter'));
app.use('/vision', require('./routes/visionRouter'));

// Start server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
