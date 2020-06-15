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

These webhooks should work across API versions, but of course, your mileage may vary. There are many API versions and we can't test them.

#### Required Webhooks

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/product
Description: Sync Stripe products with Firestore
API Version: 2020-03-02
Event types:

- `product.deleted`
- `product.created`
- `product.updated`

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.product=whsec_yourwebhookproductsigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/price
Description: Sync Stripe prices with Firestore
API Version: 2020-03-02
Event types:

- `price.deleted`
- `price.created`
- `price.updated`

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.price=whsec_yourwebhookpricesigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/subscription
Description: Sync Stripe subscriptions with Firestore
API Version: 2020-03-02
Event types:

- `customer.subscription.deleted`
- `customer.subscription.created`
- `customer.subscription.updated`

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.subscription=whsec_yourwebhooksubscriptionsigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/invoice
Description: Sync Stripe invoices with Firestore
API Version: 2020-03-02
Event types:

- `invoice.voided`
- `invoice.updated`
- `invoice.sent`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `invoice.payment_action_required`
- `invoice.marked_uncollectible`
- `invoice.finalized`
- `invoice.deleted`
- `invoice.created`

**Note** `invoice.upcoming` is not included in this Event Types.

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.invoice=whsec_yourwebhookinvoicesigningkey`

**WARNING!**

Invoices are nested under customers in the Firestore database, but Stripe doesn't know about our customer IDs (which are really `currentUser.uid`) when it creates an invoice... so we have to use a [collection group query](https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query) to find the record to update or delete.

We use metadata on Stripe subscription objects to track the `userId`, but we haven't figured out a way to do this with invoices.
