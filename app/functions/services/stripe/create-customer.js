module.exports = function createCustomer({ schema, stripe }) {
  return async ({ email, userId }) => {
    const customer = await stripe.customers.create({ email, metadata: { userId } });
    const customerRef = schema.getCustomerRef(userId);

    return customerRef.set(customer);
  };
};
