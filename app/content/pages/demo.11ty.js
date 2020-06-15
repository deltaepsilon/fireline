const constants = require('../components/constants');

const { SDK, WEB_ROOT } = constants.FIREBASE;

module.exports = class Demo {
  data() {
    return {
      name: 'demo',
      layout: 'react',
    };
  }

  render(params) {
    return String.raw`
      <script src="${WEB_ROOT}/__/firebase/${SDK}/firebase-app.js"></script>
      <script src="${WEB_ROOT}/__/firebase/${SDK}/firebase-analytics.js"></script>
      <script src="${WEB_ROOT}/__/firebase/${SDK}/firebase-auth.js"></script>
      <script src="${WEB_ROOT}/__/firebase/${SDK}/firebase-database.js"></script>
      <script src="${WEB_ROOT}/__/firebase/${SDK}/firebase-firestore.js"></script>
      <script src="${WEB_ROOT}/__/firebase/${SDK}/firebase-functions.js"></script>
      <script src="${WEB_ROOT}/__/firebase/init.js"></script>
      <script src="/static/scripts/demo.js"></script>
    `;
  }
};
