---
title: Docs
layout: page
---

# DOCS

These docs are a work-in-progress. Complain in the [GitHub issues](https://github.com/deltaepsilon/fireline/issues) if something is missing or the guides are unclear.

## Cloud Functions for Firebase Installation

1. Set up Cloud Functions for Firebase in your project: [get started guide](https://firebase.google.com/docs/functions/get-started)

1. Install Fireline in your `/functions` folder: `cd functions && npm install @quiver/fireline`

1. Export the Fireline functions in `/functions/index.js` file: [example index.js](https://github.com/deltaepsilon/fireline/blob/master/app/functions/index.js)

1. Set your Stripe secret key value in the Cloud Functions Config:

> `firebase functions:config:set stripe.sk=sk_test_yoursecretkey`

### Client App Installation

1. Include the Firebase client SDKs in your client app: [web setup docs](https://firebase.google.com/docs/web/setup)

1. See the demo code for a React implementation: [demo code](https://github.com/deltaepsilon/fireline/blob/master/app/content/components/demo/demo.js)

### Security Rules

You'll need security rules for your `stripe-customers` collection.

See [app/firestore.rules](https://github.com/deltaepsilon/fireline/blob/master/app/firestore.rules)

### Webhooks

Configure Stripe webhooks on your [webhooks dashboard](https://dashboard.stripe.com/test/webhooks).

You'll need to configure Stripe webhooks or your Firestore records will stay synced with Stripe.

You can send test webhook calls from the Stripe Webhooks dashboard. But note that the `subscription.updated` and `subscription.deleted` webhooks won't work unless you first create a subscription with the correct `id`.

You can also serve your webhooks locally using `yarn serve:https`. Note that you'll need to configure external DNS, Nginx and Certbot if you want to test against your local dev environment.

#### Required Webhooks

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/product
Description: Sync Stripe products with Firestore
Event types:

- product.deleted
- product.created
- product.updated

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.product=whsec_yourwebhookproductsigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/price
Description: Sync Stripe prices with Firestore
Event types:

- price.deleted
- price.created
- price.updated

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.price=whsec_yourwebhookpricesigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/subscription
Description: Sync Stripe subscriptions with Firestore
Event types:

- subscription.deleted
- subscription.updated

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.subscription=whsec_yourwebhooksubscriptionsigningkey`

**WARNING!**

Subscriptions are nested under customers in the Firestore database, but Stripe doesn't know about our customer IDs (which are really `currentUser.uid`)... so we have to use a [collection group query](https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query) to find the record to update or delete.

The `subscription.deleted` Stripe webhook event can never work, because the webhook doesn't provide us with enough information to correctly nest the subscription under the correct customer. As a result, we create all subscriptions manually and let the webhooks handle `subscription.deleted` and `subscription.updated`.

You'll have a tricky time testing these webhooks using Stripe's test webhook events, because the `id` of the test event doesn't already exist in Firestore. You can make the tests work by creating a subscription record in Firestore at `stripe-customers/some-fake-uid/subscriptions/subscription_00000000000000`. You can put any data in there that you want. The webhook test will overwrite it.
