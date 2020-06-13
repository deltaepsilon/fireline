---
title: Docs
layout: page
---

# DOCS

These docs are a work-in-progress. Complain in the [GitHub issues](https://github.com/deltaepsilon/fireline/issues) if something is missing or the guides are unclear.

## Cloud Functions for Firebase Installation

Set up Cloud Functions for Firebase in your project: [get started guide](https://firebase.google.com/docs/functions/get-started)

Install Fireline in your `/functions` folder: `cd functions && npm install @quiver/fireline`

Export the Fireline functions in `/functions/index.js` file: [example index.js](https://github.com/deltaepsilon/fireline/blob/master/app/functions/index.js)

Set your Stripe secret key value in the Cloud Functions Config:

`firebase functions:config:set stripe.sk=sk_test_yoursecretkey`

### Client App Installation

Include the Firebase client SDKs in your client app: [web setup docs](https://firebase.google.com/docs/web/setup)

See the demo code for a React implementation: [demo code](https://github.com/deltaepsilon/fireline/blob/master/app/content/components/demo/demo.js)

### Security Rules

You'll need security rules for your `stripe-customers` collection.

See [firestore.rules example](https://github.com/deltaepsilon/fireline/blob/master/app/firestore.rules)

### Webhooks

Configure Stripe webhooks on your [webhooks dashboard](https://dashboard.stripe.com/test/webhooks).

You'll need to configure webhooks for the Fireline webhooks, or your Firestore records will not be able to sync with Stripe.

You can send test webhook calls from the Stripe Webhooks dashboard.

You can also serve your webhooks locally using `yarn serve:https`. Note that you'll need to have external DNS, Nginx and Certbot configured if you want to test against your local dev environment.

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
