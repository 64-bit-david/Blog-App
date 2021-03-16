const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//test push

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      let googleName;
      if (profile.name.familyName) {
        googleName = profile.name.givenName + ' ' + profile.name.familyName[0];
      }
      else {
        googleName = profile.name.givenName;
      }

      const user = await new User({ googleId: profile.id, username: null, name: googleName }).save();
      done(null, user);
    }
  )
);
