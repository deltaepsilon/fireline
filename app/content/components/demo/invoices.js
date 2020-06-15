import React from 'react';
import useStripeCustomerInvoices from '~/hooks/use-stripe-customer-invoices';

export default function Invoices() {
  const invoices = useStripeCustomerInvoices();

  return (
    <div>
      <h3>Invoices</h3>

      <table>
        <thead>
          <tr>
            <th>Created</th>
            <th>Due</th>
            <th>Paid</th>
            <th>Total</th>
            <th>Details</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          {invoices
            .sort((a, b) => (a.created < b.created ? 1 : -1))
            .map((invoice) => {
              const { currency } = invoice;

              return (
                <tr>
                  <td>{formatStripeDate(invoice.created)}</td>
                  <td>{formatCurrency({ amount: invoice.amount_due, currency })}</td>
                  <td>{invoice.paid ? 'paid' : 'unpaid'}</td>
                  <td>{formatCurrency({ amount: invoice.total, currency })}</td>
                  <td>{invoice.lines.data[0].description}</td>
                  <td>
                    {formatStripeDate(invoice.lines.data[0].period.start)} to{' '}
                    {formatStripeDate(invoice.lines.data[0].period.end)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

function formatCurrency({ amount, currency }) {
  return (amount / 100).toLocaleString(navigator.language, {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
}

function formatStripeDate(stripeDate) {
  const unix = stripeDate * 1000;
  const date = new Date(unix);

  return date.toLocaleDateString();
}
