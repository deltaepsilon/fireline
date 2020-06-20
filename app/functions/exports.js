const isDev = process.env.NODE_ENV == 'development';
const context = isDev ? require('./utilities/dev-context') : require('./utilities/prod-context');
const {
  cancelSubscription,
  createCustomer,
  removePaymentMethod,
  savePaymentMethod,
  subscribe,
  webhooks,
} = require('./index');


exports.context = context;
exports.schema = require('./utilities/schema');
exports.createSchema = exports.schema.createSchema;

exports.cancelSubscription = cancelSubscription;
exports.createCustomer = createCustomer;
exports.removePaymentMethod = removePaymentMethod;
exports.savePaymentMethod = savePaymentMethod;
exports.subscribe = subscribe;
exports.webhooks = webhooks;
