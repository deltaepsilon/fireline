const StripeService = require('../../../services/stripe');

module.exports = function subscribe(context) {
  const stripeService = StripeService(context);

  return async ({ customerId, paymentMethodId, priceId }, { auth }) => {
    if (!auth.uid) {
      throw new Error('invalid auth');
    }

    if (!customerId) {
      throw new Error('customerId missing invalid');
    }

    if (!paymentMethodId) {
      throw new Error('paymentMethodId missing invalid');
    }

    if (!priceId) {
      throw new Error('priceId missing invalid');
    }

    try {
      const userId = auth.uid;

      return stripeService.subscribe({ customerId, paymentMethodId, priceId, userId });
    } catch (error) {
      console.error(JSON.stringify({ auth, customerId, paymentMethodId, priceId }));

      throw error;
    }
  };
};
