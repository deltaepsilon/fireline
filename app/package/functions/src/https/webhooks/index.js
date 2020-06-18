const express = require('express');
const cors = require('cors');
const app = express();
const StripeWebhooks = require('./stripe.webhooks');

module.exports = function Webhooks(context) {
  app.use(cors({ origin: true }));

  app.use('/stripe', StripeWebhooks(context));

  app.use('/health-check', (req, res) => {
    res.send('health check');
  });

  return app;
};
