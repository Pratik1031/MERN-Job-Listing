const express = require('express');
const {
  checkRoute,
  register,
  login,
  addJob,
  updateJob,
  searchJob,
  getSpecificJob,
  logout,
  getAllJobs,
  getMyProfile,
} = require('../controller/UserContoller');
const isAuthenticated = require('../middlewares/auth');

const router = express.Router();

router.get('/', checkRoute);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.post('/add-job', isAuthenticated, addJob);
router.put('/update-job/:id', isAuthenticated, updateJob);
router.post('/searchJob', searchJob);
router.get('/job/:id', getSpecificJob);
router.get('/getAllJobs', getAllJobs);
router.get('/me', isAuthenticated, getMyProfile);
router.get('/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = router;
