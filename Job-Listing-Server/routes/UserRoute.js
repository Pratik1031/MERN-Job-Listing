const express = require('express');
const checkRoute = require('../controller/UserContoller');

const router = express.Router();

router.get('/health', checkRoute);

module.exports = router;
