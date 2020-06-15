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
      console.info(JSON.stringify({ auth, paymentMethodId }));

      return { error };
    }
  };
};
