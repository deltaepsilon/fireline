import { useEffect, useState } from 'react';

import flattenSnapshot from '~/utilities/flatten-snapshot';
import useAuth from './use-auth';
import useSchema from './use-schema';

const DEFAULT_PAYMENT_METHODS = Object.assign([], { __isLoading: true });

export default function useStripePaymentMethods() {
  const { currentUser } = useAuth();
  const schema = useSchema();
  const [paymentMethods, setPaymentMethods] = useState(DEFAULT_PAYMENT_METHODS);

  useEffect(() => {
    if (currentUser?.uid) {
      const paymentMethodsRef = schema.getPaymentMethodsRef(currentUser?.uid);

      return paymentMethodsRef.onSnapshot((snapshot) => {
        const paymentMethods = flattenSnapshot(snapshot);

        setPaymentMethods(paymentMethods);
      });
    }
  }, [currentUser, schema, setPaymentMethods]);

  return paymentMethods;
}
