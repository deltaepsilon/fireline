const admin = require('firebase-admin');
const environment = require('../environments/functions-env.js');

try {
  admin.app();

  console.log('@quiver/fireline is using an existing app');
} catch (error) {
  admin.initializeApp();
}

module.exports = { admin, environment };
