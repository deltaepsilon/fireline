import { useEffect, useState } from 'react';

import flattenSnapshot from '~/utilities/flatten-snapshot';
import useAuth from './use-auth';
import useSchema from './use-schema';

const DEFAULT_CUSTOMER_SUBSCRIPTIONS = Object.assign([], { __isLoading: true });

export default function useStripeCustomerSubscriptions() {
  const { currentUser } = useAuth();
  const schema = useSchema();
  const [customerSubscriptions, setCustomerSubscriptions] = useState(
    DEFAULT_CUSTOMER_SUBSCRIPTIONS
  );

  useEffect(() => {
    if (currentUser?.uid) {
      const customerSubscriptionsRef = schema.getCustomerSubscriptionsRef(currentUser?.uid);

      return customerSubscriptionsRef.onSnapshot((snapshot) => {
        const customerSubscriptions = flattenSnapshot(snapshot);

        setCustomerSubscriptions(customerSubscriptions);
      });
    }
  }, [currentUser, schema, setCustomerSubscriptions]);

  return customerSubscriptions;
}
