import { useEffect, useState } from 'react';

import flattenSnapshot from '../utilities/flatten-snapshot';
import useSchema from './use-schema';

const DEFAULT_PRODUCTS = Object.assign([], { __isLoading: true });

export default function useStripeProducts() {
  const schema = useSchema();
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);

  useEffect(() => {
    const productsRef = schema.getProductsRef();

    return productsRef.onSnapshot((snapshot) => {
      const products = flattenSnapshot(snapshot);

      setProducts(products);
    });
  }, [schema, setProducts]);

  return products;
}
