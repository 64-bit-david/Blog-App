import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { fetchAuthorBasic, postPayment } from '../actions';



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);




const ProductDisplay = ({ handleClick, amount, setAmount, }) => (



  <div className="payment-before">
    <div className="header-container">
      <h1>Support the author with a donation!</h1>
    </div>
    <label>Select an Amount</label>
    <select
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    >
      <option value='1'>£1</option>
      <option value='2'>£2</option>
      <option value='3'>£3</option>
      <option value='4'>£4</option>
      <option value='5'>£5</option>
    </select>
    <button
      type="button"
      id="checkout-button"
      role="link"
      onClick={handleClick}
      className="btn green-btn">
      Checkout
      </button>
  </div>


);


const Message = ({ message }) => (
  <section className="payment-after">
    <p>{message}</p>
    <Link to="/">Back to HomePage</Link>
  </section>
)

const Payment = ({ author, match, fetchAuthorBasic, auth, postPayment }) => {



  const [amount, setAmount] = useState(1);

  const [message, setMessage] = useState("");




  useEffect(() => {
    const authorNameCheck = () => {
      if (author) {
        if (author.username) {
          return author.username
        }
        return author.name
      } else {
        return '';
      }
    }

    const authorName = authorNameCheck();
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    const amountPaid = query.get('amount') / 100;

    if (query.get("success")) {
      setMessage(author ? `Your donation of £${amountPaid} to ${authorName} was successful 🙂` : 'LOADING');


      if (author && auth) {
        const authorId = author._id;
        const userId = auth._id;
        postPayment(amountPaid, authorId, userId)
      }
    }
    if (query.get("canceled")) {
      setMessage(
        "Payment Canceled."
      );
    }
    if (!author && !query.get("canceled")) {
      if (match.params.authorId) {
        fetchAuthorBasic(match.params.authorId);
      } else {
        const authorId = query.get('authorId');
        fetchAuthorBasic(authorId);
      }
    }
  }, [author]);



  const handleSubmit = async (event) => {
    const stripe = await stripePromise;
    const authorId = author._id;
    const response = await axios.post('/create-checkout-session', {
      amount,
      authorId
    })


    const session = await response.data;
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }


  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleSubmit} setAmount={setAmount} amount={amount} />
  );
}

const mapStateToProps = ({ author, auth }) => {
  return { author, auth }
}

export default connect(mapStateToProps, { fetchAuthorBasic, postPayment })(Payment);
