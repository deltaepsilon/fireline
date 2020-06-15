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
  let priceId;
  let subscription;
  let customerRef;
  let customerSubscriptionRef;
  let customersUpdateFn;
  let paymentMethodsAttachFn;
  let subscriptionsCreateFn;
  let commitFn;
  let setFn;
  let updateFn;
  let func;

  beforeEach(async () => {
    auth = { uid: uuid() };
    customerId = uuid();
    paymentMethodId = uuid();
    priceId = uuid();
    subscription = { id: uuid() };
    customersUpdateFn = jest.fn();
    subscriptionsCreateFn = jest.fn(() => subscription);
    paymentMethodsAttachFn = jest.fn();
    commitFn = jest.fn();
    setFn = jest.fn();
    updateFn = jest.fn();
    customerRef = uuid();
    customerSubscriptionRef = uuid();
    mockSchema = {
      getCustomerRef: jest.fn(() => customerRef),
      getCustomerSubscriptionRef: jest.fn(() => customerSubscriptionRef),
      db: { batch: () => ({ commit: commitFn, update: updateFn, set: setFn }) },
    };
    mockStripe = {
      customers: { update: customersUpdateFn },
      paymentMethods: { attach: paymentMethodsAttachFn },
      subscriptions: { create: subscriptionsCreateFn },
    };

    func = Func(context);

    await func({ customerId, paymentMethodId, priceId }, { auth });
  });

  it('should attach payment method', () => {
    expect(paymentMethodsAttachFn).toHaveBeenCalledWith(paymentMethodId, { customer: customerId });
  });

  it('should update the customer', () => {
    expect(customersUpdateFn).toHaveBeenCalledWith(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  });

  it('should create the subscription', () => {
    expect(subscriptionsCreateFn).toHaveBeenCalledWith({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
      metadata: { userId: auth.uid },
    });
  });

  it('should call getCustomerRef with userId', async () => {
    expect(mockSchema.getCustomerRef).toHaveBeenCalledWith(auth.uid);
  });

  it('should call getCustomerSubscriptionRef with userId and subscriptionId', async () => {
    expect(mockSchema.getCustomerSubscriptionRef).toHaveBeenCalledWith(auth.uid, subscription.id);
  });

  it('should update the customerRef', () => {
    expect(updateFn).toHaveBeenCalledWith(customerRef, { subscriptionId: subscription.id });
  });

  it('should set the customerSubscriptionRef', () => {
    expect(setFn).toHaveBeenCalledWith(customerSubscriptionRef, subscription);
  });

  it('should commit the batch', () => {
    expect(commitFn).toHaveBeenCalled();
  });
});
