module.exports = function validateWebhook({ environment, stripe }) {
  const secretsMap = { product: environment.STRIPE.SIGNING_SECRET.PRODUCT };

  return (req, res, next) => {
    const lastPath = req.originalUrl.split('/').pop();
    const secret = secretsMap[lastPath];
    const sig = req.headers['stripe-signature'];

    if (secret) {
      try {
        req.stripeEvent = stripe.webhooks.constructEvent(req.rawBody, sig, secret);

        next();
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } else {
      next();
    }
  };
};
