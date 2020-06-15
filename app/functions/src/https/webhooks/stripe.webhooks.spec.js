let mockSchema;
let mockStripe;

jest.mock('../../../utilities/schema', () => () => mockSchema);
jest.mock('stripe', () => () => mockStripe);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const { Customer, Invoice, Price, Product, Subscription } = require('./stripe.webhooks');

describe('StripeWebhooks', () => {
  describe('/customer', () => {
    let event;
    let userId;
    let customerRef;
    let deleteFn;
    let setFn;
    let sendStatusFn;
    let func;

    beforeEach(() => {
      userId = uuid();
      event = { type: uuid(), data: { object: { id: uuid(), metadata: { userId } } } };
      deleteFn = jest.fn();
      setFn = jest.fn();
      sendStatusFn = jest.fn();
      customerRef = { delete: deleteFn, set: setFn };
      mockSchema = { getCustomerRef: jest.fn(() => customerRef) };

      func = Customer(context);
    });

    describe('deleted', () => {
      beforeEach(async () => {
        event.type = 'customer.deleted';

        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should delete the customer', () => {
        expect(deleteFn).toHaveBeenCalled();
      });
    });

    describe('NOT deleted', () => {
      beforeEach(async () => {
        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should call getCustomerRef with customerId', async () => {
        expect(mockSchema.getCustomerRef).toHaveBeenCalledWith(userId);
      });

      it('should set the customer', () => {
        expect(setFn).toHaveBeenCalledWith(event.data.object);
      });

      it('should return a 200', () => {
        expect(sendStatusFn).toHaveBeenCalledWith(200);
      });
    });
  });

  describe('/invoice', () => {
    let event;
    let subscriptionId;
    let userId;
    let subscriptionDoc;
    let subscriptionsRef;
    let invoiceRef;
    let deleteFn;
    let setFn;
    let whereFn;
    let sendStatusFn;
    let func;

    beforeEach(() => {
      subscriptionId = uuid();
      event = { type: uuid(), data: { object: { id: uuid(), subscription: subscriptionId } } };
      userId = uuid();
      deleteFn = jest.fn();
      setFn = jest.fn();
      sendStatusFn = jest.fn();
      subscriptionDoc = {
        ref: { path: `stripe-customers/${userId}/subscriptions/${event.data.object.id}` },
      };
      whereFn = jest.fn(() => ({ get: () => ({ docs: [subscriptionDoc] }) }));
      subscriptionsRef = { where: whereFn };
      invoiceRef = { delete: deleteFn, set: setFn };
      mockSchema = {
        getCustomerInvoiceRef: jest.fn(() => invoiceRef),
        getSubscriptionsRef: jest.fn(() => subscriptionsRef),
      };

      func = Invoice(context);
    });

    describe('deleted', () => {
      beforeEach(async () => {
        event.type = 'invoice.deleted';

        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should delete the invoice', () => {
        expect(deleteFn).toHaveBeenCalled();
      });
    });

    describe('NOT deleted', () => {
      beforeEach(async () => {
        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should get the subscription doc', () => {
        expect(whereFn).toHaveBeenCalledWith('id', '==', subscriptionId);
      });

      it('should call getCustomerInvoiceRef with productId', async () => {
        expect(mockSchema.getCustomerInvoiceRef).toHaveBeenCalledWith(userId, event.data.object.id);
      });

      it('should set the invoice', () => {
        expect(setFn).toHaveBeenCalledWith(event.data.object);
      });

      it('should return a 200', () => {
        expect(sendStatusFn).toHaveBeenCalledWith(200);
      });
    });
  });

  describe('/price', () => {
    let event;
    let priceRef;
    let deleteFn;
    let setFn;
    let sendStatusFn;
    let func;

    beforeEach(() => {
      event = { type: uuid(), data: { object: { id: uuid(), product: uuid() } } };
      deleteFn = jest.fn();
      setFn = jest.fn();
      sendStatusFn = jest.fn();
      priceRef = { delete: deleteFn, set: setFn };
      mockSchema = { getProductPriceRef: jest.fn(() => priceRef) };

      func = Price(context);
    });

    describe('deleted', () => {
      beforeEach(async () => {
        event.type = 'price.deleted';

        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should delete the price', () => {
        expect(deleteFn).toHaveBeenCalled();
      });
    });

    describe('NOT deleted', () => {
      beforeEach(async () => {
        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should call getProductPriceRef with productId', async () => {
        expect(mockSchema.getProductPriceRef).toHaveBeenCalledWith(
          event.data.object.product,
          event.data.object.id
        );
      });

      it('should set the price', () => {
        expect(setFn).toHaveBeenCalledWith(event.data.object);
      });

      it('should return a 200', () => {
        expect(sendStatusFn).toHaveBeenCalledWith(200);
      });
    });
  });

  describe('/product', () => {
    let event;
    let productRef;
    let deleteFn;
    let setFn;
    let sendStatusFn;
    let func;

    beforeEach(() => {
      event = { type: uuid(), data: { object: { id: uuid() } } };
      deleteFn = jest.fn();
      setFn = jest.fn();
      sendStatusFn = jest.fn();
      productRef = { delete: deleteFn, set: setFn };
      mockSchema = { getProductRef: jest.fn(() => productRef) };

      func = Product(context);
    });

    describe('deleted', () => {
      beforeEach(async () => {
        event.type = 'product.deleted';

        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should delete the product', () => {
        expect(deleteFn).toHaveBeenCalled();
      });
    });

    describe('NOT deleted', () => {
      beforeEach(async () => {
        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should call getProductRef with productId', async () => {
        expect(mockSchema.getProductRef).toHaveBeenCalledWith(event.data.object.id);
      });

      it('should set the product', () => {
        expect(setFn).toHaveBeenCalledWith(event.data.object);
      });

      it('should return a 200', () => {
        expect(sendStatusFn).toHaveBeenCalledWith(200);
      });
    });
  });

  describe('/subscription', () => {
    let event;
    let userId;
    let subscriptionRef;
    let deleteFn;
    let setFn;
    let sendStatusFn;
    let func;

    beforeEach(() => {
      userId = uuid();
      event = { type: uuid(), data: { object: { id: uuid(), metadata: { userId } } } };
      deleteFn = jest.fn();
      setFn = jest.fn();
      sendStatusFn = jest.fn();
      subscriptionRef = { delete: deleteFn, set: setFn };
      mockSchema = { getCustomerSubscriptionRef: jest.fn(() => subscriptionRef) };

      func = Subscription(context);
    });

    describe('deleted', () => {
      beforeEach(async () => {
        event.type = 'subscription.deleted';

        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should delete the subscription', () => {
        expect(deleteFn).toHaveBeenCalled();
      });
    });

    describe('NOT deleted', () => {
      beforeEach(async () => {
        await func({ body: event }, { sendStatus: sendStatusFn });
      });

      it('should call getCustomerSubscriptionRef with subscriptionId', async () => {
        expect(mockSchema.getCustomerSubscriptionRef).toHaveBeenCalledWith(
          userId,
          event.data.object.id
        );
      });

      it('should set the subscription', () => {
        expect(setFn).toHaveBeenCalledWith(event.data.object);
      });

      it('should return a 200', () => {
        expect(sendStatusFn).toHaveBeenCalledWith(200);
      });
    });
  });
});
