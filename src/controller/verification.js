const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const verificationEmail = async (req, res) => {
  const { emailToken, email } = req.body;

  try {
    console.log('emailToken', req.body);

    const user = await User.findOne({ email: email });
    console.log('user', user);
    if (user && user.emailToken == emailToken) {
      console.log('1');
      user.verified = true;
      await user.save();
      res.json({ success: true });
    } else res.json({ success: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  verificationEmail
};
