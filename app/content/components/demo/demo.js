import './demo.css';

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useCallback, useState } from 'react';

import useStripePromise from '~/hooks/use-stripe-promise';

export default function Demo() {
  const stripePromise = useStripePromise();

  return (
    <div id="demo">
      <h3>Stripe card demo</h3>

      <p>
        Use Stripe's <a href="https://stripe.com/docs/testing#cards">test cards</a>.
      </p>

      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>CVC</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4242424242424242</td>
            <td>Any 3 digits</td>
            <td>Any future date</td>
            <td>Visa with unlimited balance</td>
          </tr>
          <tr>
            <td>4000000000000341</td>
            <td>Any 3 digits</td>
            <td>Any future date</td>
            <td>
              Attaching this card to a Customer object succeeds, but attempts to charge the customer
              fail.
            </td>
          </tr>
          <tr>
            <td>4000000000000069</td>
            <td>Any 3 digits</td>
            <td>Any future date</td>
            <td>Charge is declined with an expired_card code</td>
          </tr>
          <tr>
            <td>4000000000000127</td>
            <td>Any 3 digits</td>
            <td>Any future date</td>
            <td>Charge is declined with an incorrect_cvc code.</td>
          </tr>
        </tbody>
      </table>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('This is where your errors will show up');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      setErrorMessage(error);

      console.log({ error, paymentMethod });
    },
    [setErrorMessage, stripe]
  );

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <div className="row">
        <button type="submit" disabled={!stripe}>
          Add payment method
        </button>
        <aside>{errorMessage}</aside>
      </div>
    </form>
  );
}
