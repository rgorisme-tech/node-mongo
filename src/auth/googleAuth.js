const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.id,
      clientSecret: config.google.secret,
      callbackURL: config.google.returnURL
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

const googleAuth = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    async function (req, res) {
      const email = req.user.emails[0].value;
      let user = await User.findOne({ email });

      if (user) {
        const payload = {
          user: {
            id: user.id
          }
        };
        user.verified = true;
        await user.save();
        jwt.sign(
          payload,
          'jwtSecret',
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            //  res.cookie('token', token, { httpOnly: true });
            res.redirect(`${config.host}/?token=` + token);
          }
        );
      } else {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(email, salt); // Use profile id as password

        console.log(req.user);
        user = new User({
          email: req.user.emails[0].value,
          name: req.user.displayName,
          password,
          verified: true
        });

        await user.save();

        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          'jwtSecret',
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.redirect(`${config.host}/?token=` + token);
          }
        );
      }
    }
  );
};
module.exports = googleAuth;
