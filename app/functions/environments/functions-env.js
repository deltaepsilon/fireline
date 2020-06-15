/**
 * The following two if-blocks are merely to suppress warnings in dev
 */
if (!process.env.FIREBASE_CONFIG) {
  process.env.FIREBASE_CONFIG = {};
}
if (!process.env.GCLOUD_PROJECT) {
  process.env.GCLOUD_PROJECT = 'fake-project';
}

const functions = require('firebase-functions');
let config = functions.config();

if (!config.firebase) {
  config.firebase = {
    projectId: process.env.FIREBASE_PROJECT,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  };
}

if (!config.stripe) {
  config.stripe = {
    sk: process.env.STRIPE_SK,
    signing_secret: {
      customer: process.env.STRIPE_SIGNING_SECRET_CUSTOMER,
      invoice: process.env.STRIPE_SIGNING_SECRET_INVOICE,
      price: process.env.STRIPE_SIGNING_SECRET_PRICE,
      product: process.env.STRIPE_SIGNING_SECRET_PRODUCT,
      subscription: process.env.STRIPE_SIGNING_SECRET_SUBSCRIPTION,
    },
  };
}

module.exports = {
  FIREBASE: {
    PROJECT_ID: config.firebase.projectId,
    DATABASE_URL: config.firebase.databaseURL,
  },
  STRIPE: {
    SK: config.stripe.sk,
    SIGNING_SECRET: {
      CUSTOMER: config.stripe.signing_secret.customer,
      INVOICE: config.stripe.signing_secret.invoice,
      PRICE: config.stripe.signing_secret.price,
      PRODUCT: config.stripe.signing_secret.product,
      SUBSCRIPTION: config.stripe.signing_secret.subscription,
    },
  },
};
