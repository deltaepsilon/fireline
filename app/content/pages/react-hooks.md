---
title: Hooks
layout: page
---

### React Hooks

Most use cases will require the same basic React hooks. We developed these hooks for the [demo](/pages/demo) and exported them for client-side use from `@quiver/fireline`.

Install with `npm install @quiver/fireline`.

See the source code on [GitHub](https://github.com/deltaepsilon/fireline/tree/master/app/content/components/hooks).

### Set Stripe PK and import

The easiest way to set the Stripe public key (PK) is to make sure to run `window.stripePk = 'pk_live_your_public_key'` in your client code. It's easiest if you put it in the `<head></head>` tag in your `index.html`.

For server-side rendering in Node you should set `STRIPE_PK` in your environment variables.

# Examples

```javascript
// Node.js server-side render
process.env.STRIPE_PK = 'pk_live_your_public_key';
```

```html
<!-- index.html -->
<script>
  window.stripePk = 'pk_live_your_public_key';
</script>
```

```javascript
// React Component
import {
  useAuth,
  useFunctions,
  useSchema,
  useStripeCustomerInvoices,
  useStripeCustomerInvoice,
  useStripeCustomerSubscriptions,
  useStripeCustomer,
  useStripePaymentMethods,
  useStripeProductPrices,
  useStripeProducts,
  useStripePromise,
} from '@quiver/fireline';

function LogAllOfTheStripeThings() {
  const { currentUser, signInWithGoogle, signOut } = useAuth();
  const functions = useFunctions();
  const schema = useSchema();
  const customerInvoices = useStripeCustomerInvoices();
  const customerSubscriptions = useStripeCustomerSubscriptions();
  const customer = useStripeCustomer();
  const paymentMethods = useStripePaymentMethods();
  const productPrices = useStripeProductPrices();
  const products = useStripeProducts();
  const stripePromise = useStripePromise();

  console.log({
    functions,
    schema,
    customerInvoices,
    customerSubscriptions,
    customer,
    paymentMethods,
    productPrices,
    products,
    stripePromise,
  });

  return null;
}
```

---

### Example: [card-form.js](https://github.com/deltaepsilon/fireline/blob/master/app/content/components/demo/card-form.js)

```javascript
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useCallback, useState } from 'react';
import { useAuth, useFunctions, useStripePromise } from '@quiver/fireline';

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
```
