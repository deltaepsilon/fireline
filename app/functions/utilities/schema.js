module.exports = ({ admin, environment }) => {
  const db = admin.firestore();
  const rtdb = admin.database();

  return {
    db,
    rtdb,
    getStripeUsersRef: () => db.collection('stripe-users'),
    getStripeUserRef: (userId) => db.collection('stripe-users').doc(userId),
  };
};
