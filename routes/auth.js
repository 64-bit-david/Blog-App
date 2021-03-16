const express = require('express');
const passport = require('passport');
const User = require('../models/User');


const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get("/auth/google/redirect", passport.authenticate("google", { failureRedirect: "/auth/failed" }), (req, res) => {
  res.redirect('/');
});


router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/auth/failed', (req, res) => {
  res.send('Failed to Log in');
})

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.put('/api/update-account', async (req, res, next) => {
  const userId = req.user._id;
  const username = req.body.username;
  try {
    let user = await User.findById(userId);
    user.username = username;
    const updatedUser = await user.save();
    res.status(200).json({ msg: "Profile updated", user: updatedUser });
  } catch (err) {
    next(err);
  }

})

module.exports = router;

