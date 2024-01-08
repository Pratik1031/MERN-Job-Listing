const express = require('express');
const { checkRoute, register, login } = require('../controller/UserContoller');

const router = express.Router();

router.get('/health', checkRoute);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
