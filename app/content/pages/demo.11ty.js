const constants = require('../components/constants');

const SDK = constants.FIREBASE.SDK;

module.exports = class Demo {
  data() {
    return {
      name: 'demo',
      layout: 'react',
    };
  }

  render(params) {
    return String.raw`
      <script src="/__/firebase/${SDK}/firebase-app.js"></script>
      <script src="/__/firebase/${SDK}/firebase-analytics.js"></script>
      <script src="/__/firebase/${SDK}/firebase-auth.js"></script>
      <script src="/__/firebase/${SDK}/firebase-database.js"></script>
      <script src="/__/firebase/${SDK}/firebase-firestore.js"></script>
      <script src="/__/firebase/${SDK}/firebase-functions.js"></script>
      <script src="/__/firebase/init.js"></script>
      <script src="/static/scripts/demo.js"></script>
    `;
  }
};
