const express = require('express');
const router = express.Router();
const Schema = require('../../../utilities/schema');
const StripeService = require('../../../services/stripe');

const TEST_USER_ID = 'missing-or-test-user-id';

module.exports = function StripeWebhooks(context) {
  const stripeService = StripeService(context);

  router.use(stripeService.validateWebhook);

  router.get('/health-check', (req, res) => {
    res.send('health check');
  });

  router.post('/customer', Customer(context));
  router.post('/invoice', Invoice(context));
  router.post('/price', Price(context));
  router.post('/product', Product(context));
  router.post('/subscription', Subscription(context));

  return router;
};

module.exports.Customer = Customer;
function Customer(context) {
  const schema = Schema(context);

  return async (req, res) => {
    try {
      const event = req.body;
      const customer = event.data.object;
      const userId = getUserIdFromMetadata(customer.metadata);
      const isDeleted = getIsDeleted(event);
      const customerRef = schema.getCustomerRef(userId);

      if (isDeleted) {
        await customerRef.delete();
      } else {
        await customerRef.set(customer);
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('error');

      res.sendStatus(500);
    }
  };
}

module.exports.Invoice = Invoice;
function Invoice(context) {
  const schema = Schema(context);

  return async (req, res) => {
    try {
      const event = req.body;
      const invoice = event.data.object;
      const isDeleted = getIsDeleted(event);
      const subscriptionDoc = await findSubscriptionDoc({
        schema,
        subscriptionId: invoice.subscription,
      });
      const userId = getUserIdFromPath(subscriptionDoc && subscriptionDoc.ref);
      const invoiceRef = schema.getCustomerInvoiceRef(userId, invoice.id);

      if (isDeleted) {
        await invoiceRef.delete();
      } else {
        await invoiceRef.set(invoice);
      }

      res.sendStatus(200);
    } catch (error) {
      console.error(error);

      res.sendStatus(500);
    }
  };
}

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
      const userId = getUserIdFromMetadata(subscription.metadata);
      const isDeleted = getIsDeleted(event);
      const customerSubscriptionRef = schema.getCustomerSubscriptionRef(userId, subscription.id);

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

function getUserIdFromPath(ref) {
  let result = TEST_USER_ID;

  if (ref) {
    const [, userId] = ref.path.split('/');

    result = userId;
  }

  return result;
}

function getUserIdFromMetadata(metadata) {
  return metadata.userId || TEST_USER_ID;
}

async function findSubscriptionDoc({ schema, subscriptionId }) {
  const subscriptionsRef = schema.getSubscriptionsRef();
  const subscriptionsSnapshot = await subscriptionsRef.where('id', '==', subscriptionId).get();
  const [doc] = subscriptionsSnapshot.docs;

  return doc;
}
