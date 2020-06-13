import { useEffect, useState } from 'react';

import flattenDoc from '~/utilities/flatten-doc';
import useAuth from './use-auth';
import useSchema from './use-schema';

const DEFAULT_CUSTOMER = { __isLoading: true };

export default function useStripeCustomer() {
  const { currentUser } = useAuth();
  const schema = useSchema();
  const [customer, setCustomer] = useState(DEFAULT_CUSTOMER);

  useEffect(() => {
    if (currentUser?.uid) {
      const customerRef = schema.getCustomerRef(currentUser?.uid);

      return customerRef.onSnapshot((doc) => {
        const customer = flattenDoc(doc);

        setCustomer(customer);
      });
    }
  }, [currentUser, schema, setCustomer]);

  return customer;
}
