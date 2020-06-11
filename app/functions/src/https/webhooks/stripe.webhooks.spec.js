let mockSchema;
let mockStripe;

jest.mock('../../../utilities/schema', () => () => mockSchema);
jest.mock('stripe', () => () => mockStripe);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const { Product } = require('./stripe.webhooks');

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

      it('should delete the paymentMethod', () => {
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

      it('should set the paymentMethod', () => {
        expect(setFn).toHaveBeenCalledWith(event.data.object);
      });

      it('should return a 200', () => {
        expect(sendStatusFn).toHaveBeenCalledWith(200);
      });
    });
  });
});
