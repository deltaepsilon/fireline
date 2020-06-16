import flattenDoc from './utilities/flatten-doc';
import flattenSnapshot from './utilities/flatten-snapshot';
import useAuth from './hooks/use-auth';
import useFirebase from './hooks/use-firebase';
import useFunctions from './hooks/use-functions';
import useSchema from './hooks/use-schema';
import useStripeCustomer from './hooks/use-stripe-customer';
import useStripeCustomerInvoices from './hooks/use-stripe-customer-invoices';
import useStripeCustomerSubscriptions from './hooks/use-stripe-customer-subscriptions';
import useStripePaymentMethods from './hooks/use-stripe-payment-methods';
import useStripeProductPrices from './hooks/use-stripe-product-prices';
import useStripeProducts from './hooks/use-stripe-products';
import useStripePromise from './hooks/use-stripe-promise';
import { createSchema } from '../../functions/utilities/schema';

export {
  createSchema,
  flattenDoc,
  flattenSnapshot,
  useAuth,
  useFirebase,
  useFunctions,
  useSchema,
  useStripeCustomer,
  useStripeCustomerInvoices,
  useStripeCustomerSubscriptions,
  useStripePaymentMethods,
  useStripeProductPrices,
  useStripeProducts,
  useStripePromise,
};
