module.exports = function removePaymentMethod({ schema }) {
  return async ({ paymentMethodId, userId }) => {
    const paymentMethodRef = schema.getPaymentMethodRef(userId, paymentMethodId);

    return paymentMethodRef.delete();
  };
};
