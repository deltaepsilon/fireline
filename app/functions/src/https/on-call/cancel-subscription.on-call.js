const StripeService = require('../../../services/stripe');

module.exports = function cancelSubscription(context) {
  const stripeService = StripeService(context);

  return async (subscriptionId, { auth }) => {
    if (!auth.uid) {
      throw new Error('invalid auth');
    }

    if (!subscriptionId) {
      throw new Error('subscriptionId missing');
    }

    try {
      const userId = auth.uid;

      return stripeService.cancelSubscription({ subscriptionId, userId });
    } catch (error) {
      console.error(JSON.stringify({ auth, subscriptionId }));

      throw error;
    }
  };
};
