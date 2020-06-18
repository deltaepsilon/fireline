### Docs

See [fireline.chrisesplin.com](https://fireline.chrisesplin.com/)

### Cloud Functions Installation

`cd functions && npm install @quiver/fireline`

```bash
# /bin/firebase-config.sh
#! bin/sh
echo "Exporting firebase functions config..."

npx firebase functions:config:set \
  stripe.sk=$STRIPE_SK \
  stripe.signing_secret.customer=$STRIPE_SIGNING_SECRET_CUSTOMER \
  stripe.signing_secret.invoice=$STRIPE_SIGNING_SECRET_INVOICE \
  stripe.signing_secret.price=$STRIPE_SIGNING_SECRET_PRICE \
  stripe.signing_secret.payment_method=$STRIPE_SIGNING_SECRET_PAYMENT_METHOD \
  stripe.signing_secret.product=$STRIPE_SIGNING_SECRET_PRODUCT \
  stripe.signing_secret.subscription=$STRIPE_SIGNING_SECRET_SUBSCRIPTION \
   --token $FIREBASE_TOKEN --project=$FIREBASE_PROJECT
```

```javascript
// /functions/index.js
const functions = require('firebase-functions');
const {
  cancelSubscription,
  createCustomer,
  savePaymentMethod,
  subscribe,
  webhooks,
} = require('@quiver/fireline');

// Fireline
exports.cancelSubscription = cancelSubscription;
exports.createCustomer = createCustomer;
exports.savePaymentMethod = savePaymentMethod;
exports.removePaymentMethod = PaymentMethod;
exports.subscribe = subscribe;
exports.webhooks = webhooks;
```

### Client Installation

`npm install @quiver/fireline`

Usage Examples:

```html
<!-- index.html -->
<script>
  window.stripePk = 'pk_live_your_public_key';
</script>
```

```javascript
async function getCustomer() {
  const schema = createSchema({ db: firebase.firestore() });
  const currentUser = firebase.auth().currentUser;
  const customerRef = schema.getCustomerRef(currentUser.uid);
  const customerDoc = await customerRef.get();
  const customer = flattenDoc(customerDoc);

  return customer;
}
```

```javascript
async function getProducts() {
  const schema = createSchema({ db: firebase.firestore() });
  const productsRef = schema.getProductsRef();
  const productsSnapshot = await productsRef.get();
  const products = flattenSnapshot(productsSnapshot);

  return products;
}
```

```javascript
// React Component
import React from 'react';
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
