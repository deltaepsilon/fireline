const stripeConstructor = require('stripe');
const Schema = require('../../utilities/schema');
const CreateCustomer = require('./create-customer');
const RemovePaymentMethod = require('./remove-payment-method');
const SavePaymentMethod = require('./save-payment-method');
const ValidateWebhook = require('./validate-webhook');

module.exports = function Stripe(context) {
  const environment = context.environment;
  const schema = Schema(context);
  const stripe = stripeConstructor(context.environment.STRIPE.SK);

  return {
    stripe,
    createCustomer: CreateCustomer({ schema, stripe }),
    removePaymentMethod: RemovePaymentMethod({ schema }),
    savePaymentMethod: SavePaymentMethod({ schema }),
    validateWebhook: ValidateWebhook({ environment, stripe }),
  };
};
