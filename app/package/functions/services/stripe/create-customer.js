module.exports = function createCustomer({ stripe }) {
  return async ({ customer, userId }) => {
    if (!customer.metadata) {
      customer.metadata = {};
    }

    customer.metadata.userId = userId;

    return stripe.customers.create(customer);
  };
};
