module.exports = function createCustomer({ schema, stripe }) {
  return async ({ subscriptionId, userId }) => {
    const doc = await schema.getCustomerSubscriptionRef(userId, subscriptionId).get();
    const subscription = doc.data();

    if (!subscription) {
      throw 'subscription missing';
    }

    return stripe.subscriptions.del(subscriptionId);
  };
};
