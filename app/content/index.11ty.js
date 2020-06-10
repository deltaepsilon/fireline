const products = require('./_data/products');

module.exports = class Index {
  data() {
    return {
      name: 'Index',
      layout: 'page',
      title: 'Fireline: Stripe + Firebase',
    };
  }

  render() {
    return String.raw`
      <h3>Stripe ❤️ Firebase</h3>

      <p>
        Does your SaaS app need a quick integration with Stripe? 
      </p>
      <p>
        Do you use Firebase?
      </p>

      <h3>Callable Cloud Functions</h3>

      <p>
        Fireline provides a drop-in Stripe integration into your Firebase app. Fireline exports a set of secure <a href="https://firebase.google.com/docs/functions/callable">Firebase Callable Functions</a> that you can attach to your Cloud Functions for Firebase deployment.
      </p>
      <p>
        Your client apps can call Fireline's callable functions as if they were client functions, but the functions themselves execute in a secure environment with access to your Stripe private key.
      </p>

      <h3>Firestore Integrated</h3>

      <p>
        Fireline stores the results of your Stripe subscriptions in Firestore.
      </p>
      <p>
        Firestore makes your client-side code easy as pie. Your client app subscribes to the user's <strong>/stripe-users/{userId}</strong> document for realtime updates to their subscription.
      </p>
    `;
  }
};
