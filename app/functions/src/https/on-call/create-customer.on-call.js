const StripeService = require('../../../services/stripe');

module.exports = function createCustomer(context) {
  const stripeService = StripeService(context);

  return async (customer, { auth }) => {
    if (!auth.uid) {
      throw new Error('invalid auth');
    }

    if (!customer.email) {
      throw new Error('customer.email missing');
    }

    try {
      const userId = auth.uid;

      return stripeService.createCustomer({ customer, userId });
    } catch (error) {
      console.error(JSON.stringify({ auth, email }));

      throw error;
    }
  };
};
