let stripePk;

if (process?.env) {
  stripePk = process.env.STRIPE_PK;
} else if (typeof window != 'undefined') {
  stripePk = window.stripePk;
}

module.exports = {
  environment: 'production',
  STRIPE: {
    PK: stripePk,
  },
};
