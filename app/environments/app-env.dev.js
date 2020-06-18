let stripePk;

if (process?.env?.STRIPE_PK) {
  stripePk = process.env.STRIPE_PK;
} else if (typeof window != 'undefined') {
  stripePk = window.stripePk;
}

module.exports = {
  environment: 'development',
  SUBDOMAINS: new Set(['local', 'localhost', '127', 'dev']),
  STRIPE: {
    PK: stripePk,
  },
};
