echo "Exporting firebase functions config..."

npx firebase functions:config:set \
  stripe.sk=$STRIPE_SK \
  stripe.signing_secret.customer=$STRIPE_SIGNING_SECRET_CUSTOMER \
  stripe.signing_secret.invoice=$STRIPE_SIGNING_SECRET_INVOICE \
  stripe.signing_secret.price=$STRIPE_SIGNING_SECRET_PRICE \
  stripe.signing_secret.payment_method=$STRIPE_SIGNING_SECRET_PAYMENT_METHOD \
  stripe.signing_secret.product=$STRIPE_SIGNING_SECRET_PRODUCT \
  stripe.signing_secret.subscription=$STRIPE_SIGNING_SECRET_SUBSCRIPTION \
