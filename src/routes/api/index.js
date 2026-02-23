const express = require('express');
const router = express.Router();

// Import the specific routers
const usersRouter = require('./users');
const authRouter = require('./auth');
const transactionRouter = require('./transaction');
const verification = require('./verification');

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/transaction', transactionRouter);
router.use('/verification', verification);
module.exports = router;
