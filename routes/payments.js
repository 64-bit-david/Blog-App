const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const isAuth = require('../middleware/isAuth');
const PaymentId = require('../models/PaymentId');

const User = require('../models/User');

const router = express.Router();

router.post('/create-checkout-session', isAuth, async (req, res, next) => {
  //convert stripe value to currency value
  const amount = req.body.amount * 100;
  const author = req.body.authorId;

  //create a new paymentId Schma
  //if successful, redirects with this Schema id
  //and after redirect below we post the payment data to db
  //and check that the schemaid exists, and has not processed a payment yet
  const paymentId = new PaymentId();
  try {
    await paymentId.save();
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
      success_url: `${keys.stripePath}/payment?success=true&authorId=${author}&amount=${amount}&paymentId=${paymentId._id}`,
      cancel_url: `${keys.stripePath}/payment?canceled=true`,
    });
    res.json({ id: session.id });
  } catch (err) {
    next(err)
  }
});

//when payment is redirected successfully, an id is added to db.
//We check for existance of id, and that it is set to false
//once payment is posted id is set to true
//so if true, payment will not be posted
//(prevents bug where on success page user can keep refreshing to increase their amount paid)
router.post('/post-payment-data', isAuth, async (req, res, next) => {
  const authorId = req.body.authorId;
  const userId = req.body.userId;
  const amountPaid = req.body.amount;
  const paymentId = req.body.paymentId;
  try {
    const payment = await PaymentId.findById(paymentId);
    if (payment.isUsed) {
      return res.status(403).json({ msg: 'payment already posted' });
    }
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
    payment.isUsed = true;
    await payment.save();
    await author.save();
    await user.save();
    res.status(201).json({ msg: 'Payment posted', user })
  } catch (err) {
    next(err);
  }
})

module.exports = router;
