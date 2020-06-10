const admin = require('firebase-admin');
const environment = require('../environments/functions-env.js');

admin.initializeApp();

module.exports = { admin, environment };
