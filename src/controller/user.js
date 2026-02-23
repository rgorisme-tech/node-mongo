const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, phoneNumber, birthday } = req.body;

  try {
    if (req.user) {
      const user = await User.findById(req.params.id);

      if (!user) {
        console.log(user);
        return res.status(400).json({ errors: [{ msg: 'Error occurs' }] });
      }

      user.name = name;
      user.phoneNumber = phoneNumber;
      user.birthday = birthday;

      await user.save();
      res.json({ user });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

////////////////////////////////////////////

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Error occurs' }] });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    console.log('user', user);

    res.status(200).json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
module.exports = {
  updateProfile,
  changePassword
};
