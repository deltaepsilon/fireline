const admin = require('firebase-admin');
const environment = require('../environments/functions-env.js');
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: environment.FIREBASE.DATABASE_URL,
});

module.exports = { admin, environment };
