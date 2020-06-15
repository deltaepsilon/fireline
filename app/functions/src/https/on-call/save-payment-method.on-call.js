const StripeService = require('../../../services/stripe');

module.exports = function savePaymentMethod(context) {
  const stripeService = StripeService(context);

  return async (paymentMethod, { auth }) => {
    if (!auth.uid) {
      throw new Error('invalid auth');
    }

    try {
      const userId = auth.uid;

      return stripeService.savePaymentMethod({ paymentMethod, userId });
    } catch (error) {
      console.info(JSON.stringify({ auth, paymentMethod }));

      return { error };
    }
  };
};
