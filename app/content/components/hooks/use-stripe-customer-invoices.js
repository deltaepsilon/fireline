import { useEffect, useState } from 'react';

import flattenSnapshot from '~/utilities/flatten-snapshot';
import useAuth from './use-auth';
import useSchema from './use-schema';

const DEFAULT_CUSTOMER_INVOICES = Object.assign([], { __isLoading: true });

export default function useStripeCustomerInvoices() {
  const { currentUser } = useAuth();
  const schema = useSchema();
  const [customerInvoices, setCustomerInvoices] = useState(
    DEFAULT_CUSTOMER_INVOICES
  );

  useEffect(() => {
    if (currentUser?.uid) {
      const customerInvoicesRef = schema.getCustomerInvoicesRef(currentUser?.uid);

      return customerInvoicesRef.onSnapshot((snapshot) => {
        const customerInvoices = flattenSnapshot(snapshot);

        setCustomerInvoices(customerInvoices);
      });
    }
  }, [currentUser, schema, setCustomerInvoices]);

  return customerInvoices;
}
