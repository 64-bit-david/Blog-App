const express = require('express');
const passport = require('passport');





const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get("/auth/google/redirect", passport.authenticate("google", { failureRedirect: "/auth/failed" }), (req, res) => {
  res.redirect('/your-profile');
});


//this is run on almost every render through client header,
//passport checks user has a valid cookie session and if so, sends the req.user

router.get('/api/current_user', (req, res) => {
  try {
    res.send(req.user)
  } catch (err) {
    console.log(err);
  };
});

router.get('/auth/failed', (req, res) => {
  res.send('Failed to Log in');
})

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});



module.exports = router;

