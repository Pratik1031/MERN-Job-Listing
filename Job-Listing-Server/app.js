const express = require('express');
const User = require('./routes/UserRoute');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { ErrorMiddleware } = require('./middlewares/ErrorMiddleWare');
const app = express();

dotenv.config({
  path: './config/.env',
});
app.use(express.json());
app.use(cookieParser());
app.use('/user', User);
app.use(ErrorMiddleware);
module.exports = app;
