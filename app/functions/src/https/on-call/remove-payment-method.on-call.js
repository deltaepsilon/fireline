const StripeService = require('../../../services/stripe');

module.exports = function removePaymentMethod(context) {
  const stripeService = StripeService(context);

  return async (paymentMethodId, { auth }) => {
    if (!auth.uid) {
      throw new Error('invalid auth');
    }

    try {
      const userId = auth.uid;

      return stripeService.removePaymentMethod({ paymentMethodId, userId });
    } catch (error) {
      console.error(JSON.stringify({ auth, paymentMethodId }));

      throw error;
    }
  };
};
