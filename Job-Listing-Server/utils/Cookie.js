const jwt = require('jsonwebtoken');

const setCookie = (res, user, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    .json({
      success: true,
      message,
    });
};

module.exports = setCookie;
