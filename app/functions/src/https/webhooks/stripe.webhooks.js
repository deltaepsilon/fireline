const express = require('express');
const router = express.Router();
const Schema = require('../../../utilities/schema');
const StripeService = require('../../../services/stripe');

module.exports = function StripeWebhooks(context) {
  const stripeService = StripeService(context);

  router.use(stripeService.validateWebhook);

  router.get('/health-check', (req, res) => {
    res.send('health check');
  });

  router.post('/product', Product(context));

  return router;
};

module.exports.Product = Product;

function Product(context) {
  const schema = Schema(context);

  return async (req, res) => {
    const event = req.body;
    const product = event.data.object;
    const isDeleted = getIsDeleted(event);
    const productRef = schema.getProductRef(product.id);

    if (isDeleted) {
      await productRef.delete();
    } else {
      await productRef.set(product);
    }

    res.sendStatus(200);
  };
}

function getIsDeleted(event) {
  return event.type.split('.').pop() == 'deleted';
}
