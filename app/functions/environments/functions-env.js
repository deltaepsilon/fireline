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

if (!config.stripe) {
  config.stripe = {
    pk: process.env.STRIPE_PK,
    sk: process.env.STRIPE_SK,
  };
}

module.exports = {
  STRIPE: {
    pk: config.stripe.pk,
    sk: config.stripe.sk,
  },
};
