---
title: Client
layout: page
---

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
