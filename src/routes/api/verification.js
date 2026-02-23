const express = require('express');
const router = express.Router();

const { verificationEmail } = require('../../controller/verification');
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', verificationEmail);

module.exports = router;
