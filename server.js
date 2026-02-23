const express = require('express');
const session = require('express-session');
const connectDB = require('./db');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const router = require('./src/routes/api');
const googleAuth = require('./src/auth/googleAuth');

const app = express();

// const corsOrigin = {
//   origin: 'https://gdpc.io', //or whatever port your frontend is using
//   credentials: true,
//   optionSuccessStatus: 200
// };
app.use(cors());

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' } // For secure https set: true
  })
);

app.use(passport.initialize());
app.use(cookieParser());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

googleAuth(app);

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api', router);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
