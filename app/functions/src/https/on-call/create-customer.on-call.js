const StripeService = require('../../../services/stripe');

module.exports = function createCustomer(context) {
  const stripeService = StripeService(context);

  return async (email, { auth }) => {
    if (!auth.uid) {
      throw new Error('invalid auth');
    }

    if (!email) {
      throw new Error('email missing invalid');
    }

    try {
      const userId = auth.uid;

      return stripeService.createCustomer({ email, userId });
    } catch (error) {
      console.error(JSON.stringify({ auth, email }));

      throw error;
    }
  };
};
