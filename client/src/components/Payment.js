import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { clearError, fetchAuthorBasic, postPayment, dropNav } from '../actions';



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);



// render pre payment
const ProductDisplay = ({ handleClick, amount, setAmount }) => (


  <div className="payment-before">
    <div className="header-container">
      <h1>Support the author with a donation!</h1>
    </div>
    <label htmlFor="donation-amount">Select an Amount</label>
    <select
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      id="donation-amount"
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

//render message post payment, message will display success or failure or cancel
const Message = ({ message }) => (

  <section className="payment-after">
    <p>{message}</p>
    <Link to="/">Back to HomePage</Link>
  </section>

)

const Payment = ({ author, match, fetchAuthorBasic, auth, postPayment, clearError, dropNav }) => {



  const [amount, setAmount] = useState(1);

  const [message, setMessage] = useState("");


  useEffect(() => {
    return function cleanup() {
      clearError()
    }
  }, [clearError]);

  useEffect(() => {
    if (!author) {
      fetchAuthorBasic(match.params.authorId)
    }
  }, [author, fetchAuthorBasic, match.params.authorId])


  useEffect(() => {
    return function cleanup() {
      dropNav(false);
    }
  }, [dropNav]);

  //check username
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
    const paymentId = query.get('paymentId');

    //if success, send message with amout paid and to which user
    if (query.get("success")) {
      setMessage(author ? `Your donation of £${amountPaid} to ${authorName} was successful 🙂` : 'LOADING');


      //post payment data, 
      if (author && auth) {
        const authorId = author._id;
        const userId = auth._id;
        postPayment(amountPaid, authorId, userId, paymentId);
      }
    }
    //if payment cancelled 
    if (query.get("canceled")) {
      setMessage(
        "Payment Cancelled."
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

  }, [author]); // eslint-disable-line react-hooks/exhaustive-deps



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
      return (
        <p>{result.error.message}</p>
      )
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

export default connect(mapStateToProps, { fetchAuthorBasic, postPayment, clearError, dropNav })(Payment);