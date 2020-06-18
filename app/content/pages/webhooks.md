---
title: Webhooks
layout: page
---

# Webhooks

Configure Stripe webhooks on your [webhooks dashboard](https://dashboard.stripe.com/test/webhooks).

You'll need to configure Stripe webhooks or your Firestore records will stay synced with Stripe.

You can send test webhook calls from the Stripe Webhooks dashboard. Note that some webhooks require metadata that Stripe's test calls don't have, so you'll see records in your Firestore database under `missing-or-test-user-id`.

You can also serve your webhooks locally using `yarn serve:https`. Note that you'll need to configure external DNS, Nginx and Certbot if you want to test against your local dev environment.

These webhooks should work across API versions, but of course, your mileage may vary. There are many API versions and we can't test them.

### Cloud Functions config

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

---

# Required Webhooks

URL: `https://your-project-name.cloudfunctions.net/webhooks/stripe/customer`
<br/>Description: Sync Stripe customers with Firestore
<br/>API Version: 2020-03-02
<br/>Event types:

- `customer.updated`
- `customer.deleted`
- `customer.created`

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.customer=whsec_yourwebhookcustomersigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/invoice
<br/>Description: Sync Stripe invoices with Firestore
<br/>API Version: 2020-03-02
<br/>Event types:

- `invoice.created`
- `invoice.deleted`
- `invoice.finalized`
- `invoice.marked_uncollectible`
- `invoice.payment_action_required`
- `invoice.payment_failed`
- `invoice.payment_succeeded`
- `invoice.sent`
- `invoice.updated`
- `invoice.voided`

**Note** `invoice.upcoming` is not included in this Event Types.

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.invoice=whsec_yourwebhookinvoicesigningkey`

**WARNING!**

Invoices are nested under customers in the Firestore database, but Stripe doesn't know about our customer IDs (`currentUser.uid`) when it creates an invoice... so we have to use a [collection group query](https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query) to find the record to update or delete.

Make sure to set your [Firestore indexes](https://github.com/deltaepsilon/fireline/blob/master/app/firestore.indexes.json) and include `subscriptions`!!!

We use metadata on other Stripe objects to track the `userId`, but we haven't figured out a way to do this with invoices 🤷

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/paymentMethod
<br/>Description: Sync Stripe paymentMethods with Firestore
<br/>API Version: 2020-03-02
<br/>Event types:

- `payment_method.updated`
- `payment_method.detached`
- `payment_method.card_automatically_updated`
- `payment_method.attached`

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.paymentMethod=whsec_yourwebhookpaymentmethodsigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/price
<br/>Description: Sync Stripe prices with Firestore
<br/>API Version: 2020-03-02
<br/>Event types:

- `price.deleted`
- `price.created`
- `price.updated`

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.price=whsec_yourwebhookpricesigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/product
<br/>Description: Sync Stripe products with Firestore
<br/>API Version: 2020-03-02
<br/>Event types:

- `product.deleted`
- `product.created`
- `product.updated`

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.product=whsec_yourwebhookproductsigningkey`

---

URL: https://your-project-name.cloudfunctions.net/webhooks/stripe/subscription
<br/>Description: Sync Stripe subscriptions with Firestore
<br/>API Version: 2020-03-02
<br/>Event types:

- `customer.subscription.deleted`
- `customer.subscription.created`
- `customer.subscription.updated`

Cloud Functions signing secret command:
`firebase functions:config:set stripe.signing_secret.subscription=whsec_yourwebhooksubscriptionsigningkey`
