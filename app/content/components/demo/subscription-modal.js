import React, { useCallback, useEffect, useState } from 'react';

import CardForm from './card-form';
import Modal from '~/ui/modal';
import PaymentMethods from './payment-methods';
import useAuth from '~/hooks/use-auth';
import useFunctions from '~/hooks/use-functions';
import useStripeCustomer from '~/hooks/use-stripe-customer';
import useStripePaymentMethods from '~/hooks/use-stripe-payment-methods';
import useStripeProductPrices from '~/hooks/use-stripe-product-prices';

export default function SubscriptionModalWrapper({ showModal, ...props }) {
  return (
    <Modal showModal={showModal}>
      <SubscriptionModal {...props} />
    </Modal>
  );
}

function SubscriptionModal({ onClose, product, subscription }) {
  const functions = useFunctions();
  const customer = useStripeCustomer();
  const paymentMethods = useStripePaymentMethods();
  const prices = useStripeProductPrices({ productId: product.id });
  const { currentUser } = useAuth();
  const [priceId, setPriceId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const onPriceChange = useCallback((e) => setPriceId(e.target.value), [prices, setPriceId]);
  const handleCancelSubscription = useCallback(async () => {
    setIsProcessing(true);

    try {
      await functions.cancelSubscription({
        subscriptionId: subscription.id,
      });

      alert('subscription saved');
    } catch (error) {
      alert(error);
    }

    onClose();
  }, [functions, onClose, setIsProcessing, subscription]);
  const handleSubscribe = useCallback(async () => {
    setIsProcessing(true);

    try {
      if (subscription) {
        await functions.cancelSubscription({
          subscriptionId: subscription.id,
        });
      }

      await functions.subscribe({
        customerId: customer.id,
        paymentMethodId: paymentMethods[0].id,
        priceId: priceId,
      });

      alert('subscription saved');
    } catch (error) {
      alert(error);
    }

    onClose();
  }, [customer, functions, onClose, paymentMethods, priceId, setIsProcessing, subscription]);
  const buttonText = subscription ? 'Change subscription' : 'Subscribe';

  useEffect(() => {
    const isCustomerMissing = getIsCustomerMissing(customer);

    if (isCustomerMissing && !isProcessing) {
      (async () => {
        setIsProcessing(true);

        try {
          await functions.createCustomer(currentUser.email);

          setIsProcessing(false);
        } catch (error) {
          alert(error);
        }
      })();
    }
  }, [currentUser, customer, functions, isProcessing]);

  useEffect(() => {
    switch (true) {
      case isProcessing:
      case !paymentMethods.length:
      case !product:
      case !priceId:
      case getIsCustomerMissing(customer):
        setDisabled(true);
        break;

      default:
        setDisabled(false);
        break;
    }
  }, [customer, isProcessing, paymentMethods, priceId, product]);

  useEffect(() => {
    const [firstPrice] = prices;

    firstPrice && setPriceId(firstPrice.id);
  }, [prices, setPriceId]);

  console.log('subscription', subscription);

  return (
    <div>
      <div className="header">
        <h2>Subscribe: {product.name}</h2>
      </div>
      <div className="body">
        <p>{product.description}</p>

        <img src={product.images[0]} alt={`${product.name} thumbnail`} />

        {paymentMethods.length ? <PaymentMethods /> : <CardForm />}

        <select name="price" id="price" value={priceId} onChange={onPriceChange}>
          {prices.map((price) => (
            <option value={price.id} disabled={price.id == subscription?.plan.id}>
              {`${price.unit_amount / 100} ${price.currency.toUpperCase()} per ${
                price.recurring.interval
              }`}
            </option>
          ))}
        </select>

        <div className="buttons">
          <button onClick={onClose}>Cancel</button>
          {subscription && <button onClick={handleCancelSubscription}>Cancel Subscription</button>}
          <button onClick={handleSubscribe} disabled={disabled}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

function getIsCustomerMissing(customer) {
  return !customer.__isLoading && !customer.id;
}
