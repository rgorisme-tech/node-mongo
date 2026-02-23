const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const {
  createTransaction,
  getTransactions
} = require('../../controller/transaction');

// @route    GET api/transaction
// @desc     Get user by token
// @access   Private
router.get('/', auth, getTransactions);

// @route    POST api/transaction
// @desc     Authenticate user & get token
// @access   Public
router.post('/', auth, createTransaction);
module.exports = router;
