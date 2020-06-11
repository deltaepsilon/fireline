let mockSchema;

jest.mock('../../../utilities/schema', () => () => mockSchema);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const Func = require('./save-payment-method.on-call');

describe('SavePaymentMethod', () => {
  let auth;
  let paymentMethod;
  let paymentMethodRef;
  let setFn;
  let func;

  beforeEach(async () => {
    auth = { uid: uuid() };
    paymentMethod = { id: uuid() };
    setFn = jest.fn();
    paymentMethodRef = { set: setFn };
    mockSchema = { getPaymentMethodRef: jest.fn(() => paymentMethodRef) };

    func = Func(context);

    await func(paymentMethod, { auth });
  });

  it('should call getPaymentMethodRef with userId and paymentId', async () => {
    expect(mockSchema.getPaymentMethodRef).toHaveBeenCalledWith(auth.uid, paymentMethod.id);
  });

  it('should set the paymentMethod', () => {
    expect(setFn).toHaveBeenCalledWith(paymentMethod);
  });
});
