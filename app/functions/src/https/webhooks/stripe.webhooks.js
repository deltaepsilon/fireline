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

  router.post('/price', Price(context));
  router.post('/product', Product(context));
  router.post('/subscription', Subscription(context));

  return router;
};

module.exports.Price = Price;
function Price(context) {
  const schema = Schema(context);

  return async (req, res) => {
    try {
      const event = req.body;
      const price = event.data.object;
      const isDeleted = getIsDeleted(event);
      const priceRef = schema.getProductPriceRef(price.product, price.id);

      if (isDeleted) {
        await priceRef.delete();
      } else {
        await priceRef.set(price);
      }

      res.sendStatus(200);
    } catch (error) {
      console.error(error);

      res.sendStatus(500);
    }
  };
}

module.exports.Product = Product;
function Product(context) {
  const schema = Schema(context);

  return async (req, res) => {
    try {
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
    } catch (error) {
      console.error(error);

      res.sendStatus(500);
    }
  };
}

module.exports.Subscription = Subscription;
function Subscription(context) {
  const schema = Schema(context);

  return async (req, res) => {
    try {
      const event = req.body;
      const subscription = event.data.object;
      const isDeleted = getIsDeleted(event);
      const subscriptionsRef = schema.getSubscriptionsRef();
      const subscriptionsSnapshot = await subscriptionsRef.where('id', '==', subscription.id).get();
      const [doc] = subscriptionsSnapshot.docs;
      const customerSubscriptionRef = doc.ref;

      if (isDeleted) {
        await customerSubscriptionRef.delete();
      } else {
        await customerSubscriptionRef.set(subscription);
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('error');

      res.sendStatus(500);
    }
  };
}

function getIsDeleted(event) {
  return event.type.split('.').pop() == 'deleted';
}
