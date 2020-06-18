let mockSchema;
let mockStripe;

jest.mock('../../../utilities/schema', () => () => mockSchema);
jest.mock('stripe', () => () => mockStripe);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const Func = require('./subscribe.on-call');

describe('Subscribe', () => {
  let auth;
  let customerId;
  let paymentMethodId;
  let subscription;
  let stripeSubscription;
  let customersUpdateFn;
  let paymentMethodsAttachFn;
  let updateFn;
  let func;

  beforeEach(async () => {
    auth = { uid: uuid() };
    customerId = uuid();
    paymentMethodId = uuid();
    subscription = { priceId: uuid() };
    stripeSubscription = { id: uuid() };
    customersUpdateFn = jest.fn();
    subscriptionsCreateFn = jest.fn(() => stripeSubscription);
    paymentMethodsAttachFn = jest.fn();
    updateFn = jest.fn();
    mockSchema = {
      getCustomerRef: jest.fn(() => ({ update: updateFn })),
    };
    mockStripe = {
      customers: { update: customersUpdateFn },
      paymentMethods: { attach: paymentMethodsAttachFn },
      subscriptions: { create: subscriptionsCreateFn },
    };

    func = Func(context);

    await func({ customerId, paymentMethodId, subscription }, { auth });
  });

  it('should attach payment method', () => {
    expect(paymentMethodsAttachFn).toHaveBeenCalledWith(paymentMethodId, { customer: customerId });
  });

  it('should update the customer', () => {
    expect(customersUpdateFn).toHaveBeenCalledWith(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  });

  it('should call stripe.subscriptions.create', () => {
    expect(subscriptionsCreateFn).toHaveBeenCalledWith({ customer: customerId, ...subscription });
  });
});
