let mockSchema;
let mockStripe;

jest.mock('../../../utilities/schema', () => () => mockSchema);
jest.mock('stripe', () => () => mockStripe);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const Func = require('./create-customer.on-call');

describe('CreateCustomer', () => {
  let auth;
  let email;
  let customer;
  let customerRef;
  let createFn;
  let setFn;
  let func;

  beforeEach(async () => {
    auth = { uid: uuid() };
    email = uuid();
    customer = uuid();
    createFn = jest.fn(() => customer);
    setFn = jest.fn();
    customerRef = { set: setFn };
    mockSchema = { getCustomerRef: jest.fn(() => customerRef) };
    mockStripe = { customers: { create: createFn } };

    func = Func(context);

    await func(email, { auth });
  });

  it('should call getCustomerRef with userId', async () => {
    expect(mockSchema.getCustomerRef).toHaveBeenCalledWith(auth.uid);
  });

  it('should create the Stripe customer', () => {
    expect(mockStripe.customers.create).toHaveBeenCalledWith({ email });
  });

  it('should set the customer', () => {
    expect(setFn).toHaveBeenCalledWith(customer);
  });
});
