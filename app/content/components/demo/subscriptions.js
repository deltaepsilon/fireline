import React from 'react';
import useStripeCustomer from '~/hooks/use-stripe-customer';
import useStripePaymentMethods from '~/hooks/use-stripe-payment-methods';

export default function Subscriptions() {
  const customer = useStripeCustomer();
  const paymentMethods = useStripePaymentMethods();

  return !paymentMethods.length ? (
    <EmptyState isLoading={paymentMethods.__isLoading} />
  ) : (
    <SubscriptionSelector />
  );
}

function SubscriptionSelector() {
  return <h1>Subscription selector</h1>;
}

function EmptyState({ isLoading }) {
  return !isLoading && <p>You'll need a payment method before you can subscribe ☝</p>;
}
