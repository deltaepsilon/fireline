let mockSchema;
let mockStripe;

jest.mock('../../../utilities/schema', () => () => mockSchema);
jest.mock('stripe', () => () => mockStripe);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const Func = require('./create-customer.on-call');

describe('CreateCustomer', () => {
  let auth;
  let customer;
  let stripeCustomer;
  let createFn;
  let func;

  beforeEach(async () => {
    auth = { uid: uuid() };
    customer = { email: uuid() };
    stripeCustomer = uuid();
    createFn = jest.fn(() => stripeCustomer);
    mockStripe = { customers: { create: createFn } };

    func = Func(context);

    await func(customer, { auth });
  });

  it('should create the Stripe customer', () => {
    expect(mockStripe.customers.create).toHaveBeenCalledWith({
      email: customer.email,
      metadata: { userId: auth.uid },
    });
  });
});
