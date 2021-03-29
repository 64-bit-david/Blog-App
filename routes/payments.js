const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const User = require('../models/User');

const router = express.Router();

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

router.post('/post-payment-data', async (req, res, next) => {
  const authorId = req.body.authorId;
  const userId = req.body.userId;
  const amountPaid = req.body.amount / 100;
  try {
    const author = await User.findById(authorId);
    if (author.donationsRecieved) {
      author.donationsRecieved += amountPaid;
    } else {
      author.donationsRecieved = amountPaid;
    }

    const user = await User.findById(userId);
    if (user.donationsSent) {
      user.donationsSent += amountPaid;
    } else {
      user.donationsSent = amountPaid;
    }
    await author.save();
    await user.save();
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
