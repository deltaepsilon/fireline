import React, { useCallback, useMemo, useState } from 'react';

import SubscriptionModal from './subscription-modal';
import constants from '~/constants';
import useAuth from '~/hooks/use-auth';
import useStripeCustomerSubscriptions from '~/hooks/use-stripe-customer-subscriptions';
import useStripeProducts from '~/hooks/use-stripe-products';

export default function Subscriptions() {
  const { currentUser } = useAuth();

  return !currentUser ? (
    <EmptyState isLoading={currentUser === undefined} />
  ) : (
    <SubscriptionSelector />
  );
}

function SubscriptionSelector() {
  const allProducts = useStripeProducts();
  const products = useMemo(() => allProducts.filter((p) => constants.STRIPE.PRODUCT_IDS.has(p.id)));
  const subscriptions = useStripeCustomerSubscriptions();
  const [product, setProduct] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const getClickHandler = useCallback(
    ({ product, subscription }) => () => {
      setProduct(product);
      setSubscription(subscription);
    },
    [setProduct, setSubscription]
  );
  const onClose = useCallback(() => setProduct(null), [setProduct]);

  return (
    <div>
      <ul id="subscriptions">
        {products
          .filter((p) => p.active)
          .map((product) => (
            <Product
              product={product}
              getClickHandler={getClickHandler}
              subscriptions={subscriptions}
            />
          ))}
      </ul>
      <SubscriptionModal
        showModal={!!product}
        product={product}
        subscription={subscription}
        subscriptions={subscriptions}
        onClose={onClose}
      />
    </div>
  );
}

function Product({ getClickHandler, product, subscriptions }) {
  const [src] = product.images;
  const subscription = subscriptions.find((s) => s.plan.product == product.id);
  const buttonText = subscription ? 'Change subscription' : 'Choose subscription';

  return (
    <li data-is-subscribed={!!subscription}>
      <h5>{product.name}</h5>

      <p>{product.description}</p>

      <img src={src} alt={`${product.name} thumbnail`} />

      <button onClick={getClickHandler({ product, subscription })}>{buttonText}</button>
    </li>
  );
}

function EmptyState({ isLoading }) {
  return !isLoading && <p>You'll need to be signed in to subscribe ☝</p>;
}
