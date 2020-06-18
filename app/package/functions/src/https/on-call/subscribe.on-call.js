const StripeService = require('../../../services/stripe');

module.exports = function subscribe(context) {
  const stripeService = StripeService(context);

  return async ({ customerId, paymentMethodId, subscription }, { auth }) => {
    if (!auth.uid) {
      throw new Error('invalid auth');
    }

    if (!customerId) {
      throw new Error('customerId missing');
    }

    if (!paymentMethodId) {
      throw new Error('paymentMethodId missing');
    }

    if (!subscription) {
      throw new Error('subscription missing');
    }

    try {
      const userId = auth.uid;

      return stripeService.subscribe({ customerId, paymentMethodId, subscription, userId });
    } catch (error) {
      console.info(JSON.stringify({ auth, customerId, paymentMethodId, subscription }));

      return { error };
    }
  };
};
