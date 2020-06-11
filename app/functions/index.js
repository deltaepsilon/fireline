const functions = require('firebase-functions');
const context = require('./utilities/prod-context');

if (!context.environment.STRIPE.SK) {
  throw 'Firebase config missing. Example: firebase functions:config:set stripe.sk=sk_test_yourprivatekey';
}

// HTTPS on-call
const CreateCustomer = require('./src/https/on-call/create-customer.on-call.js');
exports.createCustomer = functions.https.onCall(CreateCustomer(context));

const RemovePaymentMethod = require('./src/https/on-call/remove-payment-method.on-call.js');
exports.removePaymentMethod = functions.https.onCall(RemovePaymentMethod(context));

const SavePaymentMethod = require('./src/https/on-call/save-payment-method.on-call.js');
exports.savePaymentMethod = functions.https.onCall(SavePaymentMethod(context));

// HTTP onRequest
const Webhooks = require('./src/https/webhooks');
exports.webhooks = functions.https.onRequest(Webhooks(context));