let mockSchema;
let mockStripe;

jest.mock('../../../utilities/schema', () => () => mockSchema);
jest.mock('stripe', () => () => mockStripe);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const { Price, Product } = require('./stripe.webhooks');

describe('StripeWebhooks', () => {
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
});
