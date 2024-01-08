const checkRoute = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Api is Working',
  });
};

module.exports = checkRoute;
