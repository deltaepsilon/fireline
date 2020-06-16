const admin = require('firebase-admin');
const environment = require('../environments/functions-env.js');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: environment.FIREBASE.DATABASE_URL,
});

module.exports = { admin, environment };
