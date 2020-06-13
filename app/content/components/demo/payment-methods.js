import React, { useCallback, useState } from 'react';

import useFunctions from '~/hooks/use-functions';
import useStripePaymentMethods from '~/hooks/use-stripe-payment-methods';

export default function PaymentMethods() {
  const paymentMethods = useStripePaymentMethods();

  return !paymentMethods.length ? null : <PaymentMethodsList paymentMethods={paymentMethods} />;
}

function PaymentMethodsList({ paymentMethods }) {
  const functions = useFunctions();
  const [removedPaymentMethodIds, setRemovedPaymentMethodIds] = useState(new Set());
  const getRemoveHandler = useCallback(
    (paymentMethodId) => async () => {
      setRemovedPaymentMethodIds((ids) => new Set([...ids, paymentMethodId]));

      return functions.removePaymentMethod(paymentMethodId);
    },
    [functions, setRemovedPaymentMethodIds]
  );

  return (
    <ul id="payment-methods">
      {paymentMethods.map((paymentMethod) => {
        const disabled = removedPaymentMethodIds.has(paymentMethod.id);

        return (
          <li>
            <span>
              {paymentMethod.card.brand}: ***{paymentMethod.card.last4}
            </span>
            <button
              className="small"
              onClick={getRemoveHandler(paymentMethod.id)}
              disabled={disabled}
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
}
