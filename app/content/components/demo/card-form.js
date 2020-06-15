import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useCallback, useState } from 'react';

import useAuth from '~/hooks/use-auth';
import useFunctions from '~/hooks/use-functions';
import useStripePromise from '~/hooks/use-stripe-promise';

export default function CheckoutWrapper() {
  const stripePromise = useStripePromise();

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const functions = useFunctions();
  const { currentUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setSaving(true);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        metadata: { userId: currentUser.uid },
      });

      setErrorMessage(error);

      paymentMethod && (await functions.savePaymentMethod(paymentMethod));

      setSaving(false);
    },
    [currentUser, functions, setErrorMessage, setSaving, stripe]
  );

  return (
    <form onSubmit={handleSubmit} disabled={!currentUser}>
      <CardElement />
      <div className="row">
        <button type="submit" disabled={!stripe || saving}>
          Add payment method
        </button>
        <aside>{errorMessage}</aside>
      </div>
    </form>
  );
}
