const userCollection = require('../model/UserModel');
const { ErrorHandler } = require('./ErrorMiddleWare');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler('Login First', 404));

    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userCollection.findById(data._id);
    next();
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

module.exports = isAuthenticated;
