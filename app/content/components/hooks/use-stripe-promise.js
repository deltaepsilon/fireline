import { useEffect, useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import useEnvironment from './use-environment';

export default function useStripePromise() {
  const environment = useEnvironment();
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    (async () => {
      environment && setStripePromise(loadStripe(environment.STRIPE.PK));
    })();
  }, [environment, setStripePromise]);

  return stripePromise;
}
