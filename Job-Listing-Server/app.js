const express = require('express');
const User = require('./routes/UserRoute');
const dotenv = require('dotenv');

const app = express();

dotenv.config({
  path: './config/.env',
});
app.use(express.json());
app.use('/user', User);

module.exports = app;
