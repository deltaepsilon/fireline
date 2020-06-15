module.exports = ({ admin, environment }) => {
  const db = admin.firestore();
  const rtdb = admin.database();

  return createSchema({ db, rtdb });
};

module.exports.createSchema = createSchema;

function createSchema({ db, rtdb }) {
  return {
    db,
    rtdb,
    getCustomersRef: () => db.collection('stripe-customers'),
    getCustomerRef: (userId) => db.collection('stripe-customers').doc(userId),
    getCustomerInvoicesRef: (userId) =>
      db.collection('stripe-customers').doc(userId).collection('invoices'),
    getCustomerInvoiceRef: (userId, subscriptionId) =>
      db.collection('stripe-customers').doc(userId).collection('invoices').doc(subscriptionId),
    getCustomerSubscriptionsRef: (userId) =>
      db.collection('stripe-customers').doc(userId).collection('subscriptions'),
    getCustomerSubscriptionRef: (userId, subscriptionId) =>
      db.collection('stripe-customers').doc(userId).collection('subscriptions').doc(subscriptionId),
    getPaymentMethodsRef: (userId) =>
      db.collection('stripe-customers').doc(userId).collection('payment-methods'),
    getPaymentMethodRef: (userId, paymentMethodId) =>
      db
        .collection('stripe-customers')
        .doc(userId)
        .collection('payment-methods')
        .doc(paymentMethodId),
    getProductsRef: () => db.collection('stripe-products'),
    getProductRef: (productId) => db.collection('stripe-products').doc(productId),
    getProductPricesRef: (productId) =>
      db.collection('stripe-products').doc(productId).collection('prices'),
    getProductPriceRef: (productId, priceId) =>
      db.collection('stripe-products').doc(productId).collection('prices').doc(priceId),
    getSubscriptionsRef: () => db.collectionGroup('subscriptions'),
  };
}
