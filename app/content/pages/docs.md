---
title: Docs
layout: page
---

# DOCS

These docs are a work-in-progress. Complain in the [GitHub issues](https://github.com/deltaepsilon/fireline/issues) if something is missing or the guides are unclear.

## Cloud Functions for Firebase Installation

1. Set up Cloud Functions for Firebase in your project: [get started guide](https://firebase.google.com/docs/functions/get-started)

1. Install Fireline in your `/functions` folder: `cd functions && npm install @quiver/fireline`

1. Import the Fireline functions found in Fireline's `/functions/index.js` file: [index.js](https://github.com/deltaepsilon/fireline/blob/master/app/functions/index.js)

1. Export Fireline's `index.js` functions in your own project's `/functions/index.js` file.

1. Set your Stripe secret key value in the Cloud Functions Config:

> `firebase functions:config:set stripe.sk=sk_test_yoursecretkey`

### Client App Installation

1. Include the Firebase client SDKs in your client app: [web setup docs](https://firebase.google.com/docs/web/setup)

1. See the demo code for a React implementation: [demo code](https://github.com/deltaepsilon/fireline/blob/master/app/content/components/demo/demo.js)

1. If you'd like to use Fireline's React hooks, run `npm install @quiver/fireline` and check out it's exports: [/content/components/index.js](https://github.com/deltaepsilon/fireline/blob/b329e6273b6c989b9f7b906901cff4cf66b76e4e/app/content/components/index.js). These hooks are a bit too messy to document right now, so open them up and see what they do. It's kind of straightforward? You likely have similar logic in your existing React app.

### Security Rules

You'll need security rules for your `stripe-customers` collection.

See [app/firestore.rules](https://github.com/deltaepsilon/fireline/blob/master/app/firestore.rules)

### Client-Side Implementation

See [the demo code](https://github.com/deltaepsilon/fireline/tree/b329e6273b6c989b9f7b906901cff4cf66b76e4e/app/content/components/demo) to see an example of one implementation of subscriptions.

Each client-side implementation is going to be a bit different. Feel free to copy/paste the demo files into your own project, but recognize that you'll need to make sure that it matches your desired business logic.

### Webhooks

Make sure to install all [required webhooks]('/pages/webhooks') on your [Stripe webhooks dashboard](https://dashboard.stripe.com/test/webhooks).

This integration uses Stripe as its source of truth and attempts to get data from webhooks wherever possible.

### Callable Cloud Functions

These Cloud Functions are architected to be a thin wrapper over top of Stripe's Node.js SDK. They authenticate with Firebase Authentication and attach `{ metadata: { userId: auth.uid }}` to many of the Stripe objects.

You'll need the [webhooks](/pages/webhooks) to make this work, because these functions use unidirectional data flow wherever possible. This means that they make updates to Stripe and Stripe webhooks update your Firestore database.

---

**cancelSubscription**

See [subscription-modal.js](https://github.com/deltaepsilon/fireline/blob/b329e6273b6c989b9f7b906901cff4cf66b76e4e/app/content/components/demo/subscription-modal.js#L34)

Signature: `firebase.functions().httpsCallable('cancelSubscription')(subscriptionId)`

Example:

```javascript
function clientCancelSubscription(subscription) {
  const cancelSubscription = firebase.functions().httpsCallable('cancelSubscription')

  await cancelSubscription(subscription.id);
}
```

---

**createCustomer**

`createCustomer` passes through it's `customer` argument directly to Stripe's Node.js SDK. See [stripe.customers.create()](https://stripe.com/docs/api/customers/create)

See [subscription-modal.js](https://github.com/deltaepsilon/fireline/blob/b329e6273b6c989b9f7b906901cff4cf66b76e4e/app/content/components/demo/subscription-modal.js#L75)

Signature: `firebase.functions().httpsCallable('createCustomer')(customer)`

Example:

```javascript
function clientCreateCustomer(currentUser) {
  const createCustomer = firebase.functions().httpsCallable('createCustomer')

  await createCustomer({ email: currentUser.email, metadata: { some: 'metadata' } });
}
```

---

**removePaymentMethod**

See [payment-methods.js](https://github.com/deltaepsilon/fireline/blob/b329e6273b6c989b9f7b906901cff4cf66b76e4e/app/content/components/demo/payment-methods.js#L19)

Signature: `firebase.functions().httpsCallable('removePaymentMethod')(paymentMethodId)`

Example:

```javascript
function clientRemovePaymentMethod(paymentMethod) {
  const removePaymentMethod = firebase.functions().httpsCallable('removePaymentMethod')

  await removePaymentMethod(paymentMethod.id);
}
```

---

**savePaymentMethod**

See [card-form.js](https://github.com/deltaepsilon/fireline/blob/b329e6273b6c989b9f7b906901cff4cf66b76e4e/app/content/components/demo/card-form.js#L40)

`savePaymentMethod` passes through it's `paymentMethod` argument straight to your Firestore database.

Signature: `firebase.functions().httpsCallable('savePaymentMethod')(paymentMethod)`

Example:

```javascript
function clientSavePaymentMethod(paymentMethod) {
  const savePaymentMethod = firebase.functions().httpsCallable('savePaymentMethod')

  await savePaymentMethod(paymentMethod);
}
```

---

**subscribe**

`subscribe` passes through it's `subscription` argument directly to Stripe's Node.js SDK. See [stripe.subscriptions.create()](https://stripe.com/docs/api/subscriptions/create)

See [subscription-modal.js](https://github.com/deltaepsilon/fireline/blob/b329e6273b6c989b9f7b906901cff4cf66b76e4e/app/content/components/demo/subscription-modal.js#L49)

Signature: `firebase.functions().httpsCallable('subscribe')({ customerId, paymentMethodId, subscription })`

Example:

```javascript
function clientSubscribe({ customer, paymentMethod, priceId }) {
  const subscribe = firebase.functions().httpsCallable('subscribe')

  await subscribe({
    customerId: customer.id,
    paymentMethodId: paymentMethod.id,
    subscription: {
      items: [{ price: priceId }],
    },
  });
}
```
