const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const { login, getUserInfo } = require('../../controller/auth');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, getUserInfo);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  login
);

module.exports = router;
