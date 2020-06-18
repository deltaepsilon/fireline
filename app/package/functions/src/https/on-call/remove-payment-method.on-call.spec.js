let mockSchema;

jest.mock('../../../utilities/schema', () => () => mockSchema);

const context = require('../../../utilities/dev-context');
const { v4: uuid } = require('uuid');
const Func = require('./remove-payment-method.on-call');

describe('RemovePaymentMethod', () => {
  let auth;
  let paymentMethodId;
  let paymentMethodRef;
  let deleteFn;
  let func;

  beforeEach(async () => {
    auth = { uid: uuid() };
    paymentMethodId = uuid();
    deleteFn = jest.fn();
    paymentMethodRef = { delete: deleteFn };
    mockSchema = { getPaymentMethodRef: jest.fn(() => paymentMethodRef) };

    func = Func(context);

    await func(paymentMethodId, { auth });
  });

  it('should call getPaymentMethodRef with userId and paymentId', async () => {
    expect(mockSchema.getPaymentMethodRef).toHaveBeenCalledWith(auth.uid, paymentMethodId);
  });

  it('should delete the paymentMethod', () => {
    expect(deleteFn).toHaveBeenCalled();
  });
});
