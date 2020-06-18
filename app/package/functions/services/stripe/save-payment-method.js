module.exports = function savePaymentMethod({ schema }) {
  return async ({ paymentMethod, userId }) => {
    const paymentMethodRef = schema.getPaymentMethodRef(userId, paymentMethod.id);

    return paymentMethodRef.set(paymentMethod);
  };
};
