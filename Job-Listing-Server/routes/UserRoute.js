const express = require('express');
const { checkRoute, register, login } = require('../controller/UserContoller');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();

router.get('/health', checkRoute);
router.post('/register', register);
router.post('/login', login);
router.post('/add-job', isAuthenticated, addJob);

module.exports = router;
