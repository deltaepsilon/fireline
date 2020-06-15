module.exports = function subscribe({ stripe }) {
  return async ({ customerId, paymentMethodId, subscription, userId }) => {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    if (!subscription.metadata) {
      subscription.metadata = {};
    }

    subscription.metadata.userId = userId;

    return stripe.subscriptions.create({
      customer: customerId,
      ...subscription,
    });
  };
};
