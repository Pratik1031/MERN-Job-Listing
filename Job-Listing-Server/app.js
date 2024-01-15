const express = require('express');
const User = require('./routes/UserRoute');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { ErrorMiddleware } = require('./middlewares/ErrorMiddleWare');
const app = express();

const cors = require('cors');

dotenv.config({
  path: './config/.env',
});
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_2],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use('/user', User);

app.use(ErrorMiddleware);

module.exports = app;
