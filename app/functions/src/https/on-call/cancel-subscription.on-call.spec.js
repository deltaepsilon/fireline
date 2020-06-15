let mockSchema;
let mockStripe;

jest.mock('../../../utilities/schema', () => () => mockSchema);
jest.mock('stripe', () => () => mockStripe);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const Func = require('./cancel-subscription.on-call');

describe('CreateCustomer', () => {
  let auth;
  let subscriptionId;
  let customerSubscriptionRef;
  let subscription;
  let delFn;
  let func;

  beforeEach(() => {
    auth = { uid: uuid() };
    subscriptionId = uuid();
    subscription = uuid();
    delFn = jest.fn();
    customerSubscriptionRef = { get: () => ({ data: () => subscription }) };
    mockSchema = { getCustomerSubscriptionRef: jest.fn(() => customerSubscriptionRef) };
    mockStripe = { subscriptions: { del: delFn } };

    func = Func(context);
  });

  describe('subscription exists', () => {
    beforeEach(async () => {
      await func(subscriptionId, { auth });
    });

    it('should call getCustomerSubscriptionRef', async () => {
      expect(mockSchema.getCustomerSubscriptionRef).toHaveBeenCalledWith(auth.uid, subscriptionId);
    });

    it('should delete the Stripe customer', () => {
      expect(delFn).toHaveBeenCalledWith(subscriptionId);
    });
  });

  describe('subscription does NOT exist', () => {
    beforeEach(() => {
      subscription = undefined;
    });

    it('should throw', async () => {
      try {
        await func(subscriptionId, { auth });

        throw 'did not throw correctly';
      } catch (error) {
        expect(error).toEqual('subscription missing');
      }
    });
  });
});
