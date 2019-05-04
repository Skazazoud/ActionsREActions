const authController = require('./auth.js');
const express = require('express');
const router = express.Router();

router.use('/auth', authController);

module.export = router;