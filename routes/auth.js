const express = require('express');
const passport = require('passport');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const User = require('../models/User');




const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get("/auth/google/redirect", passport.authenticate("google", { failureRedirect: "/auth/failed" }), (req, res) => {
  res.redirect('/your-profile');
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

router.post('/create-checkout-session', async (req, res, next) => {
  const amount = req.body.amount * 100;
  const author = req.body.authorId;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Donate to the Writer',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/payment?success=true&authorId=${author}&amount=${amount}`,
      cancel_url: `http://localhost:3000/payment?canceled=true`,
    });
    res.json({ id: session.id });
  } catch (err) {
    next(err)
  }
});


module.exports = router;

