---
title: Docs
layout: page
---

# DOCS

Read these docs carefully. They're short.

Complain in the [GitHub issues](https://github.com/deltaepsilon/fireline/issues) if something is missing or the guides are unclear.

---

## Cloud Functions for Firebase Installation

1. Set up Cloud Functions for Firebase in your project: [get started guide](https://firebase.google.com/docs/functions/get-started)

1. Install Fireline in your `/functions` folder: `cd functions && npm install @quiver/fireline`

1. Import the Fireline functions found in Fireline's [`/functions/index.js`](https://github.com/deltaepsilon/fireline/blob/master/app/functions/index.js) file: [/functions/index.js](https://github.com/deltaepsilon/fireline/blob/master/app/functions/index.js)

1. Export Fireline's `index.js` functions in your own project's `/functions/index.js` file. Feel free to rename them to suit your app. Just make sure to also change how they're called from your client code.

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

5. Set your Stripe environment variablesCloud Functions config:

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

6. Deploy your functions with `npx firebase deploy` or `npx firebase deploy --only functions`.

---

### Client App Installation

1. Include the Firebase client SDKs in your client app: [web setup docs](https://firebase.google.com/docs/web/setup) You'll need the `app`, `auth`, `firestore` and `functions` modules at a minimum.

1. Install with `npm install @quiver/fireline`.

1. See the [callable functions docs](/pages/callable-functions)

1. If you're integrating with React, check out the [React hooks docs](/pages/react-hooks).

1. Optionally check out the demo code for a React-specific implementation: [demo code](https://github.com/deltaepsilon/fireline/blob/master/app/content/components/demo/demo.js)

`@quiver/fireline` has exports for `createSchema`, `flattenDoc` and `flattenSnapshot`. Fireline uses them internally and we've found them to be super useful... so they're yours!

- [schema.js](https://github.com/deltaepsilon/fireline/blob/master/app/functions/utilities/schema.js)
- [flatten-doc.js](https://github.com/deltaepsilon/fireline/blob/master/app/content/components/utilities/flatten-doc.js)
- [flatten-snapshot.js](https://github.com/deltaepsilon/fireline/blob/master/app/content/components/utilities/flatten-snapshot.js)

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

---

### Security Rules

You'll need security rules for your `stripe-customers` collection.

See [app/firestore.rules](https://github.com/deltaepsilon/fireline/blob/master/app/firestore.rules)

---

### Firestore Indexes

You'll need to add a `collectionGroup` index in Firestore for `subscriptions`

See [firestore.indexes.json](https://github.com/deltaepsilon/fireline/blob/master/app/firestore.indexes.json)

```json
{
  "indexes": [],
  "fieldOverrides": [
    {
      "collectionGroup": "subscriptions",
      "fieldPath": "id",
      "indexes": [
        {
          "order": "ASCENDING",
          "queryScope": "COLLECTION"
        },
        {
          "order": "DESCENDING",
          "queryScope": "COLLECTION"
        },
        {
          "arrayConfig": "CONTAINS",
          "queryScope": "COLLECTION"
        },
        {
          "order": "ASCENDING",
          "queryScope": "COLLECTION_GROUP"
        }
      ]
    }
  ]
}
```

---

### Stripe Webhooks

Make sure to install all [required webhooks]('/pages/webhooks') on your [Stripe webhooks dashboard](https://dashboard.stripe.com/test/webhooks).

This integration uses Stripe as its source of truth and attempts to get data from webhooks wherever possible.
