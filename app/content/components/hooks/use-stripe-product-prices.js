import { useEffect, useState } from 'react';

import flattenSnapshot from '~/utilities/flatten-snapshot';
import useSchema from './use-schema';

const DEFAULT_PRODUCT_PRICES = Object.assign([], { __isLoading: true });

export default function useStripeProductPrices({ productId }) {
  const schema = useSchema();
  const [productPrices, setProductPrices] = useState(DEFAULT_PRODUCT_PRICES);

  useEffect(() => {
    if (productId) {
      const productPricesRef = schema.getProductPricesRef(productId);

      return productPricesRef.onSnapshot((snapshot) => {
        const productPrices = flattenSnapshot(snapshot);

        setProductPrices(productPrices);
      });
    }
  }, [schema, setProductPrices]);

  return productPrices;
}
