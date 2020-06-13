module.exports = function subscribe({ schema, stripe }) {
  return async ({ customerId, paymentMethodId, priceId, userId }) => {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });
    const customerRef = schema.getCustomerRef(userId);
    const customerSubscriptionRef = schema.getCustomerSubscriptionRef(userId, subscription.id);
    const batch = schema.db.batch();

    batch.update(customerRef, { subscriptionId: subscription.id });
    batch.set(customerSubscriptionRef, subscription);

    return batch.commit();
  };
};
