import './demo.css';

import AuthenticationDetails from './authentication-details';
import CardForm from './card-form';
import PaymentMethods from './payment-methods';
import React from 'react';
import Subscriptions from './subscriptions';
import useAuth from '~/hooks/use-auth';

export default function Demo() {
  const { currentUser } = useAuth();

  return (
    <div id="demo">
      <h3>Authentication Details</h3>

      <AuthenticationDetails />

      {currentUser && (
        <div>
          <h3>Subscriptions</h3>

          <Subscriptions />

          <hr />

          <h3>Manage payment methods</h3>

          <StripeTestCardsTable />

          <CardForm />

          <PaymentMethods />
        </div>
      )}

      <div id="modal" />
    </div>
  );
}

function StripeTestCardsTable() {
  return (
    <div>
      <p>
        Use Stripe's{' '}
        <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noopener noreferrer">
          test cards
        </a>
        .
      </p>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>CVC</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4242424242424242</td>
            <td>Any 3 digits</td>
            <td>Any future date</td>
            <td>Visa with unlimited balance</td>
          </tr>
          <tr>
            <td>4000000000000341</td>
            <td>Any 3 digits</td>
            <td>Any future date</td>
            <td>
              Attaching this card to a Customer object succeeds, but attempts to charge the customer
              fail.
            </td>
          </tr>
          <tr>
            <td>4000000000000069</td>
            <td>Any 3 digits</td>
            <td>Any future date</td>
            <td>Charge is declined with an expired_card code</td>
          </tr>
          <tr>
            <td>4000000000000127</td>
            <td>Any 3 digits</td>
            <td>Any future date</td>
            <td>Charge is declined with an incorrect_cvc code.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
